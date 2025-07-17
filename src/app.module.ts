import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { SeedModule } from './module/seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { CustomerModule } from './module/customer/customer.module';
import { AddressModule } from './module/address/address.module';
import { CardModule } from './module/card/card.module';
import { ProductModule } from './module/product/product.module';
import { SubCategoryModule } from './module/sub-category/sub-category.module';
import { CateoryModule } from './module/cateory/cateory.module';
import { InventoryModule } from './module/inventory/inventory.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/amazon'),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UserModule, AuthModule, SeedModule, EmailModule, CustomerModule, AddressModule, CardModule, ProductModule, SubCategoryModule, CateoryModule, InventoryModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass:AuthGuard
    },
    {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },
  ],
})
export class AppModule {}
