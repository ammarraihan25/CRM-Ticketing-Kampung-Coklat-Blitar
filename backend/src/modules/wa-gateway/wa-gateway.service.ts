import { Injectable } from '@nestjs/common';

@Injectable()
export class WaGatewayService {
  sendTicketNotification(nomor_whatsapp: string, ticketCodes: string[]) {
    const ticketList = ticketCodes.map((code, idx) => `${idx + 1}. ${code}`).join('\n');
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
    return true;
  }
}