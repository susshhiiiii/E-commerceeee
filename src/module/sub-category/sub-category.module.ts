import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from 'src/schema/sub-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubCategory.name, schema: SubCategorySchema }]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports:[SubCategoryService]
})
export class SubCategoryModule {}
