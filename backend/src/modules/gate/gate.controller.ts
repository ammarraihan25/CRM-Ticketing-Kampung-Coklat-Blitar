import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GateService } from './gate.service';
import { ScanTicketDto } from './dto/scan-ticket.dto';

@Controller('gate') // Sesuai dengan /api/v1/gate/scan
export class GateController {
  constructor(private readonly gateService: GateService) {}

  @Post('scan')
  @HttpCode(HttpStatus.OK)
  scan(@Body() scanTicketDto: ScanTicketDto) {
    return this.gateService.scan(scanTicketDto);
  }

  // Endpoint bantuan khusus untuk testing via Thunder Client (Generate Encrypted Payload)
  // JANGAN gunakan di production!
  @Post('test-encrypt')
  @HttpCode(HttpStatus.OK)
  testEncrypt(@Body('ticket_code') ticket_code: string) {
    return {
      encrypted_payload: this.gateService.encryptForTesting(ticket_code)
    };
  }
}
