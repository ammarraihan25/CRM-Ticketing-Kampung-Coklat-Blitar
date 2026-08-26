import { Controller, Get, Post, Put, Delete, Param, Body, Req, Sse, MessageEvent } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { CreateTicketRateDto, UpdateTicketRateDto, CreateRideDto, UpdateRideDto } from './config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Sse('events')
  events(): Observable<MessageEvent> {
    return this.configService.configEvents$.pipe(
      map((event) => ({
        data: event,
      } as MessageEvent)),
    );
  }

  @Get('tickets')
  getTicketRates() {
    return this.configService.getTicketRates();
  }

  @Post('tickets')
  createTicketRate(@Body() data: CreateTicketRateDto) {
    return this.configService.createTicketRate(data);
  }

  @Put('tickets/:id')
  updateTicketRate(@Param('id') id: string, @Body() data: UpdateTicketRateDto) {
    return this.configService.updateTicketRate(id, data);
  }

  @Delete('tickets/:id')
  deleteTicketRate(@Param('id') id: string) {
    return this.configService.deleteTicketRate(id);
  }

  @Get('rides')
  getRides() {
    return this.configService.getRides();
  }

  @Post('rides')
  createRide(@Body() data: CreateRideDto) {
    return this.configService.createRide(data);
  }

  @Put('rides/:id')
  updateRide(@Param('id') id: string, @Body() data: UpdateRideDto) {
    return this.configService.updateRide(id, data);
  }

  @Delete('rides/:id')
  deleteRide(@Param('id') id: string) {
    return this.configService.deleteRide(id);
  }

  @Post('upload')
  async uploadFile(@Req() req: FastifyRequest) {
    const data = await (req as any).file();
    if (!data) {
      throw new Error("No file uploaded");
    }
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    const filename = `${randomName}${extname(data.filename)}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    
    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filepath);
      data.file.pipe(writeStream);
      data.file.on('end', () => resolve(true));
      data.file.on('error', (err) => reject(err));
    });

    return {
      url: `/uploads/images/${filename}`
    };
  }
}
