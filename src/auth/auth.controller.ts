import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Request } from 'express';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('Authentication')
@Controller('auth')
    
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('register')
    @Public()        
    @ApiOperation({ summary: "Api route for registering a new user" })
    registerUser(@Body() registerUser: RegisterDto) {
        return this.authService.registerUser(registerUser)
    }
    
    @Post('login')
    @Public()    
    @ApiOperation({ summary: "Api route for logging in users" })
    loginUser(@Body() loginUser: LoginDto) {
        return this.authService.loginUser(loginUser)
    }

    @Post('request-otp')
    @Public()    
    @ApiOperation({ summary: "Api route for otp request for sigining in" })
    RequestOtp(@Body() request: RequestOtpDto) {
        return this.authService.verifyRequestOtp(request.email)
    }

    @Post('verify-mail-otp')
    @Public()        
    @ApiOperation({ summary: 'Api route for verifying otp for signing in of the user' })
    VerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.authService.verifyWithOtp(verifyOtpDto)
    }

    @Delete()    
    @ApiOperation({ summary: 'Api route for deleting the user'})
    DeleteUser(@Req() req: Request) {
        const user=req['user']
        return this.authService.deleteUser(user)
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Api route to get user'})
    getUser(@Req() req: Request) {
        const user=req['user']
        return this.authService.getUser(user)
    }

    @Put()
    @ApiBearerAuth()
    @ApiOperation({summary:"Api route for updating user"})
    updateUser(@Req()req:Request,@Body()updateUserDto:UserUpdateDto) {
        const user = req['user']
        console.log('asdnsaiod')
        return this.authService.updateUser(user,updateUserDto)
    }
}
