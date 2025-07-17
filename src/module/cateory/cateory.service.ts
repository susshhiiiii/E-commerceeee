import { Injectable } from '@nestjs/common';
import { CreateCateoryDto } from './dto/create-cateory.dto';
import { UpdateCateoryDto } from './dto/update-cateory.dto';

@Injectable()
export class CateoryService {
  create(createCateoryDto: CreateCateoryDto) {
    return 'This action adds a new cateory';
  }

  findAll() {
    return `This action returns all cateory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cateory`;
  }

  update(id: number, updateCateoryDto: UpdateCateoryDto) {
    return `This action updates a #${id} cateory`;
  }

  remove(id: number) {
    return `This action removes a #${id} cateory`;
  }
}
