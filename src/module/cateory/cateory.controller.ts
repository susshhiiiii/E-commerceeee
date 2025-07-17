import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CateoryService } from './cateory.service';
import { CreateCateoryDto } from './dto/create-cateory.dto';
import { UpdateCateoryDto } from './dto/update-cateory.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';

@ApiTags('Category')
@Roles(Role.ADMIN)
@ApiBearerAuth()
@Controller('cateory')
export class CateoryController {
  constructor(private readonly cateoryService: CateoryService) {}

  @Post()
  @ApiOperation({summary:'Api Endpoint to create Category'})
  create(@Body() createCateoryDto: CreateCateoryDto) {
    return this.cateoryService.create(createCateoryDto);
  }

  @Get()
  @ApiOperation({summary:'Api Endpoint to get Category'})
  findAll() {
    return this.cateoryService.findAll();
  }

  @ApiOperation({summary:'Api Endpoint to get Category by id'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cateoryService.findOne(id);
  }

  @Patch()
  @ApiOperation({summary:'Api Endpoint to update Category'})
  update(@Body() updateCateoryDto: UpdateCateoryDto) {
    return this.cateoryService.update( updateCateoryDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'Api Endpoint to delete Category'})
  remove(@Param('id') id: string) {
    return this.cateoryService.remove(id);
  }
}
