import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  Member,
  MemberTier,
} from '../database/entities/member.entity';
import {
  PaymentStatus,
  PosTransaction,
} from '../database/entities/pos-transaction.entity';
import { GetMembersQueryDto } from './dto/get-members-query.dto';
import { BlastWaDto } from './dto/blast-wa.dto';

const TIER_SILVER_THRESHOLD = 500_000;
const TIER_GOLD_THRESHOLD = 2_000_000;

@Injectable()
export class CrmService {
  private readonly logger = new Logger(CrmService.name);

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(PosTransaction)
    private readonly posTransactionRepository: Repository<PosTransaction>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Processes loyalty points and tier upgrade after a successful PAID POS transaction.
   * Must be invoked by POS module once payment is confirmed.
   */
  async processLoyaltyAfterPaidTransaction(posTrxId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.processLoyalty(posTrxId, queryRunner.manager);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleLoyaltyError(posTrxId, error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Processes loyalty inside an existing DB transaction (e.g. POS checkout).
   */
  async processLoyalty(
    posTrxId: string,
    manager: EntityManager,
  ): Promise<void> {
    const posTransaction = await manager.findOne(PosTransaction, {
      where: {
        pos_trx_id: posTrxId,
        payment_status: PaymentStatus.PAID,
      },
    });

    if (!posTransaction) {
      throw new NotFoundException(
        `POS transaction ${posTrxId} not found or not PAID`,
      );
    }

    const totalAmount = Number(posTransaction.total_amount);

    const member = await manager.findOne(Member, {
      where: { nomor_whatsapp: posTransaction.nomor_whatsapp },
      lock: { mode: 'pessimistic_write' },
    });

    if (!member) {
      throw new NotFoundException(
        `Member with WhatsApp ${posTransaction.nomor_whatsapp} not found`,
      );
    }

    const newTotalSpend = Number(member.total_spend) + totalAmount;
    const newTier = this.determineTier(newTotalSpend);

    member.total_spend = newTotalSpend;
    member.tier = newTier;

    await manager.save(member);
  }

  private handleLoyaltyError(posTrxId: string, error: unknown): never {
    if (error instanceof NotFoundException) {
      throw error;
    }

    this.logger.error(
      `Failed to process loyalty for POS transaction ${posTrxId}`,
      error instanceof Error ? error.stack : String(error),
    );
    throw new InternalServerErrorException(
      'Gagal memproses loyalty points setelah transaksi POS',
    );
  }

  async getMembers(query: GetMembersQueryDto) {
    try {
      const queryBuilder = this.memberRepository.createQueryBuilder('member');

      if (query.tier) {
        queryBuilder.andWhere('member.tier = :tier', { tier: query.tier });
      }

      if (query.tipe_member) {
        queryBuilder.andWhere('member.tipe_member = :tipe_member', {
          tipe_member: query.tipe_member,
        });
      }

      const [members, totalData] = await queryBuilder.getManyAndCount();

      return {
        total_data: totalData,
        data: members.map((member) => ({
          nomor_whatsapp: member.nomor_whatsapp,
          nama_lengkap: member.nama_lengkap,
          tipe_member: member.tipe_member,
          tier: member.tier,
          current_points: member.current_points,
        })),
      };
    } catch (error) {
      this.logger.error(
        'Failed to fetch member list',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Gagal mengambil data member');
    }
  }

  async triggerBlastWa(dto: BlastWaDto) {
    try {
      const count = await this.memberRepository.count({
        where: { tier: dto.target_tier },
      });

      this.logger.log(
        `[CRM BLAST MOCK] Broadcast promo sent to ${count} members tier ${dto.target_tier}`,
      );

      return {
        status: 'SUCCESS',
        message: 'Pesan promo berhasil dipicu ke queue WhatsApp',
      };
    } catch (error) {
      this.logger.error(
        'Failed to trigger WhatsApp blast',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Gagal memicu blast WhatsApp');
    }
  }

  private determineTier(totalSpend: number): MemberTier {
    if (totalSpend >= TIER_GOLD_THRESHOLD) {
      return MemberTier.GOLD;
    }

    if (totalSpend >= TIER_SILVER_THRESHOLD) {
      return MemberTier.SILVER;
    }

    return MemberTier.BRONZE;
  }
}
