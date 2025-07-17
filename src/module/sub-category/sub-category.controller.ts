import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';

@ApiTags('Sub-category')
@Roles(Role.ADMIN)  
@ApiBearerAuth()
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Api endpoint to add sub-category for a category by admin' })
  create(@Req() req: Request, @Body() createSubCategoryDto: CreateSubCategoryDto) {
    const user=req['user']
    return this.subCategoryService.create(user,createSubCategoryDto)
  }

  @Get()
  @ApiOperation({ summary: 'Api endpoint to get all sub-category' })
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Api endpoint to get sub-category by id' })
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Api endpoint to update sub-category by id' })
  update(@Param() @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoryService.update(updateSubCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Api endpoint to delete sub-category by id' })
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
