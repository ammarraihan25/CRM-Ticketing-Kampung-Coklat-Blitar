import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosTransaction, PaymentStatus } from '../../database/entities/pos-transaction.entity';
import { Member, TipeMember, MemberTier } from '../../database/entities/member.entity';
import { Ticket, StatusTiket } from '../../database/entities/ticket.entity';
import { CheckoutPosDto } from './dto/checkout-pos.dto';

@Injectable()
export class PosService {
  constructor(
    @InjectRepository(PosTransaction)
    private readonly posTransactionRepository: Repository<PosTransaction>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async checkout(dto: CheckoutPosDto) {
    const { nomor_whatsapp, cashier_id, payment_method, items } = dto;

    // 1. Validasi & Auto-Register Member jika belum terdaftar
    let member = await this.memberRepository.findOne({ where: { nomor_whatsapp } });
    if (!member) {
      member = this.memberRepository.create({
        nomor_whatsapp,
        nama_lengkap: 'Pengunjung POS',
        tipe_member: TipeMember.REGULER,
        tier: MemberTier.BRONZE,
      });
      await this.memberRepository.save(member);
    }

    // 2. Hitung Total Pembayaran
    const total_amount = items.reduce((acc, item) => acc + item.harga * item.qty, 0);

    // 3. Simpan Transaksi POS Header
    const posTrx = this.posTransactionRepository.create({
      nomor_whatsapp,
      cashier_id,
      total_amount,
      payment_method,
      payment_status: PaymentStatus.PAID,
    });
    const savedTrx = await this.posTransactionRepository.save(posTrx);

    // 4. Loop Penerbitan Tiket (Per Item & Qty)
    const ticketsIssued: Ticket[] = [];
    const validUntil = new Date();
    validUntil.setHours(23, 59, 59, 999); // Berlaku sampai akhir hari ini

    for (const item of items) {
      for (let i = 0; i < item.qty; i++) {
        // Generate Unique Code Ticket (Format: KC-YYYY-XXXX)
        const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        const ticketCode = `KC-${new Date().getFullYear()}-${randomCode}`;

        const ticket = this.ticketRepository.create({
          nomor_whatsapp,
          ticket_code: ticketCode,
          paket_id: item.paket_id,
          status_tiket: StatusTiket.ACTIVE,
          valid_until: validUntil,
        });

        const savedTicket = await this.ticketRepository.save(ticket);
        ticketsIssued.push(savedTicket);
      }
    }

    // 5. Mocking WhatsApp Gateway Integration (E-Ticket Delivery)
    this.sendWhatsAppNotification(nomor_whatsapp, ticketsIssued);

    return {
      status: 'SUCCESS',
      message: 'Transaksi POS berhasil diproses',
      data: {
        pos_trx_id: savedTrx.pos_trx_id,
        total_amount: savedTrx.total_amount,
        payment_method: savedTrx.payment_method,
        tickets_issued: ticketsIssued.map((t) => ({
          ticket_code: t.ticket_code,
          paket_id: t.paket_id,
          status_tiket: t.status_tiket,
          valid_until: t.valid_until,
        })),
      },
    };
  }

  private sendWhatsAppNotification(nomor_whatsapp: string, tickets: Ticket[]) {
    const ticketList = tickets.map((t, idx) => `${idx + 1}. ${t.ticket_code}`).join('\n');
    const message =
      `\n[WA GATEWAY MOCK]\n` +
      `========================================\n` +
      `Mengirim E-Ticket ke WhatsApp: ${nomor_whatsapp}\n` +
      `----------------------------------------\n` +
      `Terima kasih telah berkunjung ke Kampung Coklat Blitar!\n` +
      `Berikut adalah E-Ticket Anda:\n${ticketList}\n` +
      `Tunjukkan QR Code ini pada Turnstile Gate di pintu masuk.\n` +
      `========================================\n`;

    console.log(message);
  }
}