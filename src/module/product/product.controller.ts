import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Product')
@Roles(Role.VENDOR)
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({summary:'Api endpoint to add product'})
  create(@Req() req: Request, @Body() createProductDto: CreateProductDto) {
    const user=req['user']
    return this.productService.create(user,createProductDto);
  }

  @Get()
  @ApiOperation({summary:'Api endpoint to get all product of logged in vendor'})
  findAll(@Req() req: Request) {
    const user=req['user']
    return this.productService.findAll(user);
  }

  @Get('inventory/:id')
  @ApiOperation({ summary: 'Api endpoint to get all produts of provided vendor id' })
  findByInventoryId(@Req()req:Request,@Param('id')id:string) {
    const user = req['user']
    return this.productService.findByInventoryId(user,id)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Api endpoint to get produt by id' })
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user=req['user']
    return this.productService.findOne(user,id);
  }

  @Patch()
  @ApiOperation({ summary: 'Api endpoint to update produt by id' })
  update(@Req() req: Request, @Body() updateProductDto: UpdateProductDto) {
    const user=req['user']
    return this.productService.update(user,updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Api endpoint to delete produt by id' })
  remove(@Req()req:Request,@Param('id') id: string) {
    return this.productService.remove(req,id);
  }
}
