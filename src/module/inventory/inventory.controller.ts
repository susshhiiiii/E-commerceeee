import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Inventory')
@Roles(Role.VENDOR)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({summary:'Api endpoint to add Inventory'})
  create(@Req() req: Request, @Body() createInventoryDto: CreateInventoryDto,) {
    const user=req['user']
    return this.inventoryService.create(user,createInventoryDto);
  }

  @Get()
  @ApiOperation({summary:'Api endpoint to get all inventory of a vendor'})
  findAll(@Req() req: Request) {
    const user = req['user']
    return this.inventoryService.findAll(user);
  }

  @Get(':id')
    @ApiOperation({summary:'Api endpoint to ge Inventory by its id'})
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req['user']
    return this.inventoryService.findOne(user,id);
  }

  @Patch()
  @ApiOperation({summary:'Api endpoint to update Inventory'})
  update(@Req() req: Request, @Body() updateInventoryDto: UpdateInventoryDto) {
    const user=req['user']
    return this.inventoryService.update( user,updateInventoryDto,);
  }

  @Delete(':id')
  @ApiOperation({summary:'Api endpoint to delete Inventory'})
  remove(@Req() req: Request, @Param('id') id: string) {
     const user=req['user']
    return this.inventoryService.remove(user,id);
  }
}
