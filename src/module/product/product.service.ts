import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schema/product.schema';
import { Model } from 'mongoose';
import { InventoryService } from '../inventory/inventory.service';
import { Request } from 'express';
import { calculateDiscountedPrice } from 'src/helpers/common.helper';

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private productModel: Model<Product>,
  private inventoryService:InventoryService) { }

  async create(user:Request,createProductDto: CreateProductDto) {
    const { inventoryId, ...productDto } = createProductDto
    if (!await this.inventoryService.checkUserWithInventory(user['sub'],inventoryId.toString()))
      throw new UnauthorizedException()

    const product = new this.productModel(createProductDto)
    product.createdBy = user['sub'] 
    product.discountedPrice=calculateDiscountedPrice(product.markedPrice,product.discountedPercentage)
    await product.save()
    return product
  }

  async findAll(user:Request) {
    return await this.productModel.find({createdBy:user['sub']})    
  }


  async findByInventoryId(user: Request, id: string) {
    if (!await this.inventoryService.checkUserWithInventory(user['sub'],id))
      throw new UnauthorizedException()
    return await this.productModel.find({createdBy:user['sub'],inventoryId:id}) 
  }


  async findOne(user: Request, id: string) {
    const product = await this.productModel.findById(id)
    if (!product || product.createdBy != user['sub'])
      throw new UnauthorizedException()

    return product
  }

  async update(user: Request, updateProductDto: UpdateProductDto) {
    const { id, ...updateDto } = updateProductDto
    
    if (!await this.productModel.findById(id))
      throw new HttpException('No product with the given id is present', 404)

    if (!await this.inventoryService.checkUserWithInventory(user['sub'],updateDto.inventoryId.toString()))
      throw new UnauthorizedException()
    
    return await this.productModel.findByIdAndUpdate(id,updateDto,{new:true})
  }

  async remove(user:Request,id:string) {
    const product = await this.productModel.findById(id)
    
    if (!product)
      throw new HttpException('No product with the given id is present', 404)

    if (!await this.inventoryService.checkUserWithInventory(user['sub'],product.inventoryId.toString()))
       throw new UnauthorizedException()
    
    await this.productModel.findByIdAndDelete(id)
    return {response:'Product has been successfully deleted'}
  }
}
