import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateCateoryDto } from './dto/create-cateory.dto';
import { UpdateCateoryDto } from './dto/update-cateory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { response } from 'express';
import { SubCategoryService } from '../sub-category/sub-category.service';

@Injectable()
export class CateoryService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private subcategoryService:SubCategoryService
  ) { }
  async create(createCateoryDto: CreateCateoryDto) {
    const category = new this.categoryModel(createCateoryDto)
    await category.save()
    return category
  }

  async findAll() {
    return await this.categoryModel.find().exec()
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec()
    if (!category)
      throw new HttpException('No category present with the entered id', 404)
    
    return category
  }

  async update(updateCateoryDto: UpdateCateoryDto) {
    const { id, ...updatedCategory } = updateCateoryDto
    
    const category = await this.categoryModel.findById(id).exec()
    if (!category)
      throw new HttpException('No category present with the entered id', 404)

    return await this.categoryModel.findByIdAndUpdate(id,updatedCategory,{new:true})
  }

  async remove(id: string) {
    const category = await this.categoryModel.findById(id).exec()
    if (!category)
      throw new HttpException('No category present with the entered id', 404)

    await this.categoryModel.findByIdAndDelete(id)

    if (!await this.subcategoryService.deleteByCategoryId(id))
      throw new BadRequestException('Something Went wrong')

    return {response:'Category and related subcategories has been successfully deleted'}
  }
}
