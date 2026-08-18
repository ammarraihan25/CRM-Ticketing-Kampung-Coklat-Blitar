import { Injectable } from '@nestjs/common';
import { CreatePoDto } from './dto/create-po.dto';
import { UpdatePoDto } from './dto/update-po.dto';

@Injectable()
export class PosService {
  create(createPoDto: CreatePoDto) {
    return 'This action adds a new po';
  }

  findAll() {
    return `This action returns all pos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} po`;
  }

  update(id: number, updatePoDto: UpdatePoDto) {
    return `This action updates a #${id} po`;
  }

  remove(id: number) {
    return `This action removes a #${id} po`;
  }
}
