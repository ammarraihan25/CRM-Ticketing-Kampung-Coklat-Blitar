import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosTransaction, PaymentStatus } from '../../database/entities/pos-transaction.entity';
import { Member, TipeMember } from '../../database/entities/member.entity';
import { Ticket, StatusTiket } from '../../database/entities/ticket.entity';
import { CheckoutPosDto } from './dto/checkout-pos.dto';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { WaGatewayService } from '../wa-gateway/wa-gateway.service';
import { CrmService } from '../../crm/crm.service';

@Injectable()
export class PosService {
  constructor(
    @InjectRepository(PosTransaction)
    private readonly posTransactionRepository: Repository<PosTransaction>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly waGatewayService: WaGatewayService,
    private readonly crmService: CrmService,
  ) {}

  async checkout(dto: CheckoutPosDto) {
    const { whatsapp, cashier_id, payment_method, items } = dto;

    // 1. Auto-Register Member
    let member = await this.memberRepository.findOne({ where: { whatsapp } });
    if (!member) {
      member = this.memberRepository.create({
        whatsapp,
        nama: 'Pengunjung POS',
        tipeMember: TipeMember.REGULER,
      });
      await this.memberRepository.save(member);
    }

    // 2. Total Amount
    const total_amount = items.reduce((acc, item) => acc + item.harga * item.qty, 0);

    // 3. Save Transaksi Header
    const posTrx = this.posTransactionRepository.create({
      whatsapp,
      cashier_id,
      total_amount,
      payment_method,
      payment_status: PaymentStatus.PAID,
    });
    const savedTrx = await this.posTransactionRepository.save(posTrx);

    // 4. Issue Tickets
    const ticketsIssued: Ticket[] = [];
    const validUntil = new Date();
    validUntil.setHours(23, 59, 59, 999);

    for (const item of items) {
      for (let i = 0; i < item.qty; i++) {
        const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        const ticketCode = `KC-${new Date().getFullYear()}-${randomCode}`;

        const ticket = this.ticketRepository.create({
          whatsapp,
          ticket_code: ticketCode,
          paket_id: item.paket_id,
          status_tiket: StatusTiket.ACTIVE,
          valid_until: validUntil,
        });

        const savedTicket = await this.ticketRepository.save(ticket);
        ticketsIssued.push(savedTicket);
      }
    }

    // 5. Proses loyalty points & tier upgrade
    await this.crmService.processLoyaltyAfterPaidTransaction(savedTrx.pos_trx_id);

    // 6. Panggil WA Gateway Service Modular
    const ticketCodes = ticketsIssued.map((t) => t.ticket_code);
    this.waGatewayService.sendTicketNotification(whatsapp, ticketCodes);

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

  async handlePaymentWebhook(dto: PaymentWebhookDto) {
    const { pos_trx_id, transaction_status } = dto;

    const transaction = await this.posTransactionRepository.findOne({
      where: { pos_trx_id },
    });

    if (!transaction) {
      throw new BadRequestException('Transaksi tidak ditemukan');
    }

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      transaction.payment_status = PaymentStatus.PAID;
      await this.posTransactionRepository.save(transaction);

      await this.crmService.processLoyaltyAfterPaidTransaction(pos_trx_id);

      console.log(`[PAYMENT WEBHOOK] Transaksi ${pos_trx_id} berhasil di-update menjadi PAID`);

      return {
        status: 'SUCCESS',
        message: 'Status pembayaran berhasil diperbarui',
      };
    }

    return {
      status: 'PENDING_OR_FAILED',
      message: `Status transaksi saat ini: ${transaction_status}`,
    };
  }

  // Method simulasi generate QRIS
  async generateQrisPayload(pos_trx_id: string, amount: number) {
    // String data QRIS
    const qrisString = `00020101021226680016ID.CO.TELKOM.WWW01189360091100000000005204581253033605405${amount}5802ID5913KAMPUNGCOKLAT6006BLITAR6304ABCD`;

    // URL yang menghasilkan gambar QR Code asli dari string QRIS di atas
    const qrisImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrisString)}`;

    return {
      pos_trx_id,
      amount,
      qris_string: qrisString,
      qris_image_url: qrisImageUrl, // Buka URL ini di browser!
    };
  }
}