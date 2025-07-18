import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from 'src/schema/inventory.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class InventoryService {

  constructor(@InjectModel(Inventory.name)private inventoryModel:Model<Inventory>){}
  async create(user:Request,createInventoryDto: CreateInventoryDto) {
    const inventory = new this.inventoryModel(createInventoryDto)
    inventory.userId = user['sub']
    inventory.createdBy=user['sub']
    inventory.save()
    return inventory
  }

  async findAll(user:Request) {
    return await this.inventoryModel.find({ userId: user['sub'] }).exec()    
  }

  async findOne(user: Request, id: string) {
    const inventory = await this.inventoryModel.findById(id).exec()
    
    if (!inventory)
      throw new HttpException('No inventory with the present id is present', 404)
    
    if (inventory.userId != user['sub'])
      throw new UnauthorizedException()

    return inventory

  }

  async update(user:Request, updateInventoryDto: UpdateInventoryDto) {
    const { id, ...updateDto } = updateInventoryDto
     const inventory = await this.inventoryModel.findById(id).exec()
    
    if (!inventory)
      throw new HttpException('No inventory with the present id is present', 404)
    
    if (inventory.userId != user['sub'])
      throw new UnauthorizedException()

    return await this.inventoryModel.findByIdAndUpdate(id,updateDto,{new:true}).exec()
  }

  async remove(user:Request,id: string) {
    const inventory = await this.inventoryModel.findById(id).exec()
    
    if (!inventory)
      throw new HttpException('No inventory with the present id is present', 404)
    
    if (inventory.userId != user['sub'])
      throw new UnauthorizedException()

    await this.inventoryModel.findByIdAndDelete(id)
    return {response:'Inventory has been deleted'}
  }

  async checkUserWithInventory(id: string,invenotryId:string) {
    return this.inventoryModel.exists({userId:id,_id:invenotryId})
  }
}
