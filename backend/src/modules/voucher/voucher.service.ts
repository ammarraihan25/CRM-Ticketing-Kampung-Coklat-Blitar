import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher, StatusClaim, VoucherType } from '../../database/entities/voucher.entity';

const GLOBAL_PROMOS = [
  { code: 'PENGAJIAN-FREE', type: 'free', value: 100 },
  { code: 'KEDIRI-SERU15', type: 'percentage', value: 15 },
  { code: 'TOUR-BUS-20', type: 'percentage', value: 20 },
  { code: 'WEEKDAY-COCOA10', type: 'percentage', value: 10 }
];

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>
  ) {}

  async validate(code: string, whatsapp?: string) {
    // Check global promo first
    const globalPromo = GLOBAL_PROMOS.find(p => p.code === code);
    if (globalPromo) {
      return {
        success: true,
        message: 'Promo global berhasil diaplikasikan',
        data: {
          code: globalPromo.code,
          type: globalPromo.type,
          value: globalPromo.value
        }
      };
    }

    // Otherwise check DB for personal voucher
    const voucher = await this.voucherRepo.findOne({ where: { voucher_code: code } });
    if (!voucher) {
      throw new BadRequestException('Voucher tidak ditemukan atau tidak valid');
    }

    if (voucher.status_claim !== StatusClaim.ISSUED) {
      throw new BadRequestException('Voucher sudah tidak dapat digunakan (Status: ' + voucher.status_claim + ')');
    }

    const now = new Date();
    const expiry = new Date(voucher.expiry_date);
    if (expiry < now) {
      throw new BadRequestException('Voucher sudah kedaluwarsa');
    }

    if (voucher.whatsapp !== whatsapp) {
      throw new BadRequestException('Voucher ini milik member lain, pastikan nomor WhatsApp Anda benar');
    }

    return {
      success: true,
      message: 'Voucher berhasil diaplikasikan',
      data: {
        code: voucher.voucher_code,
        type: voucher.voucher_type === VoucherType.DISCOUNT ? 'fixed' : 'free',
        value: voucher.benefit_value
      }
    };
  }
}

