import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerFieldSchema, CustomerProfile } from 'src/schema/consumer.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:CustomerProfile.name,schema:CustomerFieldSchema}])],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
