import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from 'src/schema/sub-category.schema';

@Injectable()
export class SubCategoryService {

  constructor(@InjectModel(SubCategory.name)private subCategoryModel:Model<SubCategory>){}
  async create(user:Request,createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = new this.subCategoryModel(createSubCategoryDto)
    subCategory.createdBy = user['sub']
    await subCategory.save()
    return subCategory
  }

  async findAll() {
    return await this.subCategoryModel.find().exec()
  }

  async findOne(id: string) {
    return await this.subCategoryModel.findById(id)
  }

  async  update(updateSubCategoryDto: UpdateSubCategoryDto) {    
    const subCategory = await this.subCategoryModel.findById(updateSubCategoryDto.id)
    if (!subCategory)
      throw new HttpException('No subcategory present with the given id', 404)
    
    return await this.subCategoryModel.
      findByIdAndUpdate(updateSubCategoryDto.id, updateSubCategoryDto, { new: true })        
  }

  async remove(id: string) {
    const subCategory = await this.subCategoryModel.findById(id)
    if (!subCategory)
      throw new HttpException('No subcategory present with the given id', 404)

    await this.subCategoryModel.findByIdAndDelete(id)
    return {response:'Sub-category has been deleted'}
  }

  async deleteByCategoryId(id: string) {
    try{
      await this.subCategoryModel.deleteMany({ category: id }).exec()
      return true
    }
    catch {
      throw new BadRequestException('Somthing went wrong')
    }
  }
}
