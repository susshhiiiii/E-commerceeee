import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/module/user/user.service';
import { ComparePassword, PasswordHash } from 'src/helpers/hashing-password.helper';
import { JwtService } from '@nestjs/jwt';
import { OtpGenerator, VerifyOtp } from 'src/helpers/otp.helpers';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/email/dto/email.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Request, response } from 'express';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private userService: UserService,
        private jwtService: JwtService,
        private emailService:EmailService
    ) { }
    
    async registerUser(registerRequest: RegisterDto) {
        const { password, ...rest } = registerRequest
        const hashedPassword=await PasswordHash(password)
        const user = await new this.userModel({...rest,password:hashedPassword})
        await user.save()
        return user
    }

    async loginUser(loginRequest:LoginDto) {
        const user = await this.userService.findUserByEmail(loginRequest.email)
        if (!user)
            throw new HttpException('No user is found with the given id', 404)

        
        if (!await ComparePassword(loginRequest.password, user.password))
            throw new HttpException('Email and password doesnot match', 400) 
        
        const payload = {
            sub: user._id,
            email: user.email,
            username:user.username,
            role: user.role,            
        }

        return {
            accessToken:await this.jwtService.signAsync(payload)
        }
    }


    async verifyRequestOtp(email: string) {
        const user = await this.userService.findUserByEmail(email)
        if (!user)
            throw new HttpException('No user found with the given mail', 404)
        
        const otp = await OtpGenerator();
        await this.userModel.updateOne
            ({ _id: user._id }, { $set: { otp: otp, otpEnteredTime: new Date(Date.now()) } }).exec()
        
        const emailOptions: EmailDto = {
            recipeints: [
                user.email
            ],
            subject:'Otp verification of email'
        }

        try{
            //this.emailService.sendEmail(emailOptions,otp)
            return  {response :'OTP has been sent to your id'}
        }
        catch {
            return {response:'Some problem in sending email'}
        }
    }  
    
    async verifyWithOtp(verifyOtpDto: VerifyOtpDto) {
        const user = await this.userService.findUserByEmail(verifyOtpDto.email)

        if (!verifyOtpDto.email)
            throw new HttpException('No User present with the entered id',404)
        const verify = VerifyOtp(verifyOtpDto.otp, user)
        user.otp = undefined
        user.otpEnteredTime=undefined
        if (verify) {
            user.isVerified = true
            user.otp = undefined
            user.otpEnteredTime=undefined
            await user.save()
            return {
                response:'User is now verified**'
            }
        }
        throw new HttpException('Email and otp doesnot match or otp expired', 404)
        
    }

    async getUser(user:Request) {
        return await this.userModel.find({_id:user['sub']})
    }

    async updateUser(user: Request, updateDto:UserUpdateDto) {
        if (user['sub'] != updateDto.id)
            throw new UnauthorizedException()
        const { id, password,...updateReq } = updateDto
        const hashedPassword=await PasswordHash(password)
        return await this.userModel.findByIdAndUpdate(id,{password:hashedPassword,...updateReq},{new:true})        
    }

    async deleteUser(user: Request) {
        await this.userModel.findByIdAndDelete(user['sub'])
        return {response:'User has been deleted'}
    }

}
