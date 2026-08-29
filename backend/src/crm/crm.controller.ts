import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CrmService } from './crm.service';
import { GetMembersQueryDto } from './dto/get-members-query.dto';
import { BlastWaDto } from './dto/blast-wa.dto';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('members')
  getMembers(@Query() query: GetMembersQueryDto) {
    return this.crmService.getMembers(query);
  }

  @Post('blast')
  triggerBlast(@Body() body: BlastWaDto) {
    return this.crmService.triggerBlastWa(body);
  }
}
