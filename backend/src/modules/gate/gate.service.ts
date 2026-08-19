import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, StatusTiket } from '../../database/entities/ticket.entity';
import { ScanTicketDto } from './dto/scan-ticket.dto';
import * as crypto from 'crypto';

@Injectable()
export class GateService {
  private readonly ALGORITHM = 'aes-256-cbc';
  private readonly SECRET_KEY = process.env.GATE_SECRET_KEY || '12345678901234567890123456789012'; // Must be 32 bytes
  private readonly IV_LENGTH = 16;

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>
  ) {}

  // Helper method for testing (User can use this to generate payload in another endpoint if needed)
  encryptForTesting(text: string): string {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, Buffer.from(this.SECRET_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decryptPayload(encryptedPayload: string): string {
    try {
      const textParts = encryptedPayload.split(':');
      if (textParts.length !== 2) throw new Error('Invalid format');
      
      const iv = Buffer.from(textParts[0], 'hex');
      const encryptedText = Buffer.from(textParts[1], 'hex');
      
      const decipher = crypto.createDecipheriv(this.ALGORITHM, Buffer.from(this.SECRET_KEY), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      
      return decrypted.toString();
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Payload QR tidak valid atau korup (Gagal Dekripsi)',
        data: null
      });
    }
  }

  async scan(scanTicketDto: ScanTicketDto) {
    const { encrypted_payload } = scanTicketDto;
    
    // 1. Decrypt payload
    let ticket_code: string;
    
    // For easy testing, if the user sends plain text "TICKET-123" without AES, we bypass decryption for dev mode.
    // In production, remove this bypass!
    if (!encrypted_payload.includes(':')) {
      ticket_code = encrypted_payload; 
    } else {
      ticket_code = this.decryptPayload(encrypted_payload);
    }

    // 2. Find ticket
    const ticket = await this.ticketRepo.findOneBy({ ticket_code });
    if (!ticket) {
      throw new NotFoundException({
        success: false,
        message: 'Tiket tidak ditemukan di sistem',
        data: null
      });
    }

    // 3. Anti-passback & Expiry validation
    if (ticket.status_tiket === StatusTiket.USED) {
      throw new BadRequestException({
        success: false,
        message: 'Akses Ditolak (Anti-passback): Tiket sudah digunakan',
        data: { ticket_id: ticket.ticket_id }
      });
    }

    if (ticket.status_tiket === StatusTiket.EXPIRED || ticket.status_tiket === StatusTiket.CANCELLED) {
      throw new BadRequestException({
        success: false,
        message: `Akses Ditolak: Tiket sudah ${ticket.status_tiket.toLowerCase()}`,
        data: { ticket_id: ticket.ticket_id }
      });
    }

    if (new Date() > new Date(ticket.valid_until)) {
      throw new BadRequestException({
        success: false,
        message: 'Akses Ditolak: Masa berlaku tiket sudah habis',
        data: { ticket_id: ticket.ticket_id }
      });
    }

    // 4. Update status (Grant access)
    ticket.status_tiket = StatusTiket.USED;
    await this.ticketRepo.save(ticket);

    // Turnstile Middleware would send relay signal to open gate here.

    return {
      success: true,
      message: 'Akses Diterima: Gate Terbuka',
      data: {
        ticket_id: ticket.ticket_id,
        nomor_whatsapp: ticket.nomor_whatsapp,
        paket_id: ticket.paket_id
      }
    };
  }
}
