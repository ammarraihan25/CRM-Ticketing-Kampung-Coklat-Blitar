import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ShiftSummaryQueryDto } from './dto/shift-summary-query.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('shift-summary')
  getShiftSummary(@Query() query: ShiftSummaryQueryDto) {
    return this.reportsService.getShiftSummary(query);
  }
}
