import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from 'src/schema/inventory.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Inventory.name, schema:InventorySchema}])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
