import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}
    @Public()
    @Post('register')
    @ApiOperation({ summary: "Api route for registering a new user" })
    registerUser(@Body()registerUser: RegisterDto) {
        return this.authService.registerUser(registerUser)
    }
    
    @Post('login')
    @Public()
    @ApiOperation({ summary: "Api route for logging in users" })
    loginUser(@Body() loginUser: LoginDto) {
        return this.authService.loginUser(loginUser)
    }

    @Post('login/request-otp')
    @Public()
    @ApiOperation({ summary: "Api route for otp request for sigining in" })
    loginRequestOtp(@Body()request:RequestOtpDto) {
        return this.authService.loginRequestOtp(request.email)
    }

    @Post('login/verify-otp')
    @Public()
    @ApiOperation({ summary: 'Api route for verifying otp for signing in of the user' })
    loginVerifyOtp(verifyOtpDto: VerifyOtpDto) {
        return this.authService.loginWithOtp(verifyOtpDto)
    }

}
