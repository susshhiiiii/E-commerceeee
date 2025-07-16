import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async onModuleInit() {
    const userCount = await this.categoryModel.countDocuments();
    if (userCount === 0) {
        await this.categoryModel.create([
            {
                name: 'electronics',
                createdBy:'seeded'
            },
            {
                name: 'groceries',
                createdBy:'seeded'
            },
            {
                name: 'fasion',
                createdBy:'seeded'
            },
            {
                name: 'medical',
                createdBy:'seeded'
            }
        ]);      
    }
  }
}
