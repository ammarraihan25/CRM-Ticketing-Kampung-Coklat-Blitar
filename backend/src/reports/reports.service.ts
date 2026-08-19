import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PaymentStatus,
  PosTransaction,
} from '../database/entities/pos-transaction.entity';
import { ShiftSummaryQueryDto } from './dto/shift-summary-query.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(PosTransaction)
    private readonly posTransactionRepository: Repository<PosTransaction>,
  ) {}

  async getShiftSummary(query: ShiftSummaryQueryDto) {
    try {
      const rawSummary = await this.posTransactionRepository
        .createQueryBuilder('pt')
        .select('COUNT(pt.pos_trx_id)', 'total_transactions')
        .addSelect('COALESCE(SUM(pt.total_amount), 0)', 'gtv')
        .addSelect(
          `COALESCE(SUM(CASE WHEN pt.payment_method = 'CASH' THEN pt.total_amount ELSE 0 END), 0)`,
          'cash_amount',
        )
        .addSelect(
          `COALESCE(SUM(CASE WHEN pt.payment_method = 'QRIS' THEN pt.total_amount ELSE 0 END), 0)`,
          'qris_amount',
        )
        .where('pt.cashier_id = :cashierId', { cashierId: query.cashier_id })
        .andWhere('DATE(pt.created_at) = :shiftDate', {
          shiftDate: query.date,
        })
        .andWhere('pt.payment_status = :paymentStatus', {
          paymentStatus: PaymentStatus.PAID,
        })
        .getRawOne<{
          total_transactions: string;
          gtv: string;
          cash_amount: string;
          qris_amount: string;
        }>();

      return {
        cashier_id: query.cashier_id,
        shift_date: query.date,
        summary: {
          total_transactions: Number(rawSummary?.total_transactions ?? 0),
          gtv: Number(rawSummary?.gtv ?? 0),
          cash_amount: Number(rawSummary?.cash_amount ?? 0),
          qris_amount: Number(rawSummary?.qris_amount ?? 0),
          system_variance: 0.0,
        },
      };
    } catch (error) {
      this.logger.error(
        `Failed to generate shift summary for cashier ${query.cashier_id} on ${query.date}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        'Gagal mengambil ringkasan shift kasir',
      );
    }
  }
}
