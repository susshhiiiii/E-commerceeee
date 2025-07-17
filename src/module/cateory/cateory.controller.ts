import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CateoryService } from './cateory.service';
import { CreateCateoryDto } from './dto/create-cateory.dto';
import { UpdateCateoryDto } from './dto/update-cateory.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';

@ApiTags('Category')
@Roles(Role.ADMIN)
@Controller('cateory')
export class CateoryController {
  constructor(private readonly cateoryService: CateoryService) {}

  @Post()
  create(@Body() createCateoryDto: CreateCateoryDto) {
    return this.cateoryService.create(createCateoryDto);
  }

  @Get()
  findAll() {
    return this.cateoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cateoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCateoryDto: UpdateCateoryDto) {
    return this.cateoryService.update(+id, updateCateoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cateoryService.remove(+id);
  }
}
