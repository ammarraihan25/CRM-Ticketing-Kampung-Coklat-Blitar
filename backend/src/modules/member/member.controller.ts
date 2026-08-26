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
    @Query('tipeMember') tipeMember?: TipeMember,
    @Query('domisili') domisili?: string
  ) {
    return this.memberService.findAll(tipeMember, domisili);
  }

  @Get(':whatsapp')
  findOne(@Param('whatsapp') whatsapp: string) {
    return this.memberService.findOne(whatsapp);
  }
}
