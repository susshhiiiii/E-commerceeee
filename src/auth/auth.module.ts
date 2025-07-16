import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserModule } from 'src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './auth.constants';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions:{expiresIn:'120s'}
    }),
    EmailModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
