import { Controller, Post, Get, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { TipeMember } from '../../database/entities/member.entity';

@Controller('members') // Menggunakan 'members' agar sesuai dengan /api/v1/members
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll(
    @Query('tipe_member') tipe_member?: TipeMember,
    @Query('domisili') domisili?: string
  ) {
    return this.memberService.findAll(tipe_member, domisili);
  }

  @Get(':nomor_whatsapp')
  findOne(@Param('nomor_whatsapp') nomor_whatsapp: string) {
    return this.memberService.findOne(nomor_whatsapp);
  }
}
