import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketRate } from './entities/ticket-rate.entity';
import { Ride } from './entities/ride.entity';
import { Subject } from 'rxjs';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  public configEvents$ = new Subject<{ type: string; data: any }>();

  constructor(
    @InjectRepository(TicketRate)
    private readonly ticketRateRepository: Repository<TicketRate>,
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
  ) {}

  private deleteImageFile(imageUrl: string | null | undefined) {
    if (!imageUrl) return;
    if (imageUrl.startsWith('/uploads/images/')) {
      const filepath = path.join(process.cwd(), 'public', imageUrl);
      if (fs.existsSync(filepath)) {
        try {
          fs.unlinkSync(filepath);
        } catch (e) {
          console.error(`Failed to delete image: ${filepath}`, e);
        }
      }
    }
  }

  async getTicketRates() {
    return await this.ticketRateRepository.find({ order: { createdAt: 'ASC' } });
  }

  async getTicketRateById(id: string) {
    const rate = await this.ticketRateRepository.findOneBy({ id });
    if (!rate) throw new NotFoundException('TicketRate not found');
    return rate;
  }

  async createTicketRate(data: Partial<TicketRate>) {
    const rate = this.ticketRateRepository.create(data);
    const saved = await this.ticketRateRepository.save(rate);
    this.configEvents$.next({ type: 'ticket-updated', data: saved });
    return saved;
  }

  async updateTicketRate(id: string, data: Partial<TicketRate>) {
    const rate = await this.getTicketRateById(id);
    if ('imageUrl' in data && data.imageUrl !== rate.imageUrl) {
      if (rate.imageUrl) {
        this.deleteImageFile(rate.imageUrl);
      }
    }
    Object.assign(rate, data);
    const saved = await this.ticketRateRepository.save(rate);
    this.configEvents$.next({ type: 'ticket-updated', data: saved });
    return saved;
  }

  async deleteTicketRate(id: string) {
    const rate = await this.getTicketRateById(id);
    const oldImage = rate.imageUrl;
    await this.ticketRateRepository.remove(rate);
    this.deleteImageFile(oldImage);
    this.configEvents$.next({ type: 'ticket-updated', data: { id, deleted: true } });
    return { deleted: true };
  }

  async getRides() {
    return await this.rideRepository.find({ order: { createdAt: 'ASC' } });
  }

  async getRideById(id: string) {
    const ride = await this.rideRepository.findOneBy({ id });
    if (!ride) throw new NotFoundException('Ride not found');
    return ride;
  }

  async createRide(data: Partial<Ride>) {
    const ride = this.rideRepository.create(data);
    const saved = await this.rideRepository.save(ride);
    this.configEvents$.next({ type: 'ride-updated', data: saved });
    return saved;
  }

  async updateRide(id: string, data: Partial<Ride>) {
    const ride = await this.getRideById(id);
    if ('imageUrl' in data && data.imageUrl !== ride.imageUrl) {
      if (ride.imageUrl) {
        this.deleteImageFile(ride.imageUrl);
      }
    }
    Object.assign(ride, data);
    const saved = await this.rideRepository.save(ride);
    this.configEvents$.next({ type: 'ride-updated', data: saved });
    return saved;
  }

  async deleteRide(id: string) {
    const ride = await this.getRideById(id);
    const oldImage = ride.imageUrl;
    await this.rideRepository.remove(ride);
    this.deleteImageFile(oldImage);
    this.configEvents$.next({ type: 'ride-updated', data: { id, deleted: true } });
    return { deleted: true };
  }
}
