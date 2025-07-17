import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Authentication')
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

    @Post('request-otp')
    @Public()
    @ApiOperation({ summary: "Api route for otp request for sigining in" })
    RequestOtp(@Body()request:RequestOtpDto) {
        return this.authService.verifyRequestOtp(request.email)
    }

    @Post('verify-mail-otp')
    @Public()
    @ApiOperation({ summary: 'Api route for verifying otp for signing in of the user' })
    VerifyOtp(@Body()verifyOtpDto: VerifyOtpDto) {
        return this.authService.verifyWithOtp(verifyOtpDto)
    }

}
