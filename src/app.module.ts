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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/amazon'),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UserModule, AuthModule, SeedModule, EmailModule],
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
