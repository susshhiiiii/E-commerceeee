import { Module } from '@nestjs/common';
import { CateoryService } from './cateory.service';
import { CateoryController } from './cateory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schema/category.schema';
import { SubCategoryModule } from '../sub-category/sub-category.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Category.name,schema:CategorySchema}]),SubCategoryModule],
  controllers: [CateoryController],
  providers: [CateoryService],
})
export class CateoryModule {}
