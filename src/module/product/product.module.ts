import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { Inventory, InventorySchema } from 'src/schema/inventory.schema';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),InventoryModule],
  controllers: [ProductController],
  providers: [ProductService],
  
})
export class ProductModule {}
