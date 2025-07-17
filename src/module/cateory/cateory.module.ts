import { Module } from '@nestjs/common';
import { CateoryService } from './cateory.service';
import { CateoryController } from './cateory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schema/category.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Category.name,schema:CategorySchema}])],
  controllers: [CateoryController],
  providers: [CateoryService],
})
export class CateoryModule {}
