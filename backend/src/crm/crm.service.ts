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
} from '../database/entities/member.entity';
import {
  PaymentStatus,
  PosTransaction,
} from '../database/entities/pos-transaction.entity';
import { GetMembersQueryDto } from './dto/get-members-query.dto';
import { BlastWaDto } from './dto/blast-wa.dto';

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
      where: { whatsapp: posTransaction.whatsapp },
      lock: { mode: 'pessimistic_write' },
    });

    if (!member) {
      throw new NotFoundException(
        `Member with WhatsApp ${posTransaction.whatsapp} not found`,
      );
    }

    const newTotalSpend = Number(member.totalSpend) + totalAmount;
    member.totalSpend = newTotalSpend;

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

      if (query.tipe_member) {
        queryBuilder.andWhere('member.tipeMember = :tipe_member', {
          tipe_member: query.tipe_member,
        });
      }

      const [members, totalData] = await queryBuilder.getManyAndCount();

      return {
        total_data: totalData,
        data: members.map((member) => ({
          whatsapp: member.whatsapp,
          nama: member.nama,
          tipeMember: member.tipeMember,
          totalSpend: member.totalSpend,
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
      const count = await this.memberRepository.count();

      this.logger.log(
        `[CRM BLAST MOCK] Broadcast promo sent to ${count} members`,
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
}
