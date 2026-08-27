import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member, TipeMember } from '../../database/entities/member.entity';
import { Ticket } from '../../database/entities/ticket.entity';
import { Voucher } from '../../database/entities/voucher.entity';
import { PosTransaction } from '../../database/entities/pos-transaction.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>,
    @InjectRepository(PosTransaction)
    private readonly posTrxRepo: Repository<PosTransaction>
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const { whatsapp } = createMemberDto;

    // Check if member exists
    const existingMember = await this.memberRepo.findOneBy({ whatsapp });
    if (existingMember) {
      throw new BadRequestException({
        success: false,
        message: 'Nomor WhatsApp sudah terdaftar sebagai member',
        data: null
      });
    }

    const newMember = this.memberRepo.create({
      ...createMemberDto,
      tipeMember: createMemberDto.tipeMember || TipeMember.REGULER,
      totalSpend: 0
    });

    await this.memberRepo.save(newMember);

    // Give welcome voucher (example business logic from BRD)
    // WA Gateway should send the message here.

    return {
      success: true,
      message: 'Registrasi member berhasil',
      data: newMember
    };
  }

  async findAll(tipeMember?: TipeMember, domisili?: string) {
    const query = this.memberRepo.createQueryBuilder('member');

    if (tipeMember) {
      query.andWhere('member.tipeMember = :tipeMember', { tipeMember });
    }

    if (domisili) {
      // Use ILIKE for case-insensitive search if using Postgres, else LIKE
      query.andWhere('member.domisili ILIKE :domisili', { domisili: `%${domisili}%` });
    }

    const members = await query.orderBy('member.createdAt', 'DESC').getMany();

    return {
      success: true,
      message: 'Data member berhasil diambil',
      data: members
    };
  }

  async findOne(identifier: string) {
    let member;
    if (identifier.toUpperCase().startsWith('KC-')) {
      // Extract the ID number
      const idNum = parseInt(identifier.substring(3));
      if (!isNaN(idNum)) {
        member = await this.memberRepo.findOneBy({ id: idNum });
      }
    } else {
      // Treat as whatsapp
      member = await this.memberRepo.findOneBy({ whatsapp: identifier });
    }

    if (!member) {
      throw new NotFoundException({
        success: false,
        message: 'Member tidak ditemukan',
        data: null
      });
    }

    // Fetch related data
    const active_vouchers = await this.voucherRepo.find({
      where: { whatsapp: member.whatsapp, status_claim: 'ISSUED' as any } // Cast to any due to strict TS enum check if missing
    });

    const recent_transactions = await this.posTrxRepo.find({
      where: { whatsapp: member.whatsapp },
      order: { created_at: 'DESC' },
      take: 5
    });

    const tickets = await this.ticketRepo.find({
      where: { whatsapp: member.whatsapp },
      order: { valid_until: 'DESC' },
      take: 5
    });

    return {
      success: true,
      message: 'Detail member berhasil diambil',
      data: {
        ...member,
        active_vouchers,
        recent_transactions,
        tickets
      }
    };
  }
}
