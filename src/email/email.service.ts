import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import { EmailDto } from './dto/email.dto';
@Injectable()
export class EmailService {

    constructor(private configService: ConfigService) { }
    
    async emailTransport() {
        const transporter = nodemailer.createTransport({
            host:this.configService.get<string>('EMAIL_HOST'),
            port:this.configService.get<number>('EMAIL_PORT'),
            secure:false,
            auth: {
                user:this.configService.get<string>('EMAIL_USER'),
                pass:this.configService.get<string>('EMAIL_PASSWORD'),
            }
        })

        return transporter
    }

    async sendEmail(emailDto:EmailDto,otp:string) {
        const transport = await this.emailTransport()
        const options: nodemailer.sendemailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: emailDto.recipeints,
            subject: emailDto.subject,
            html:
            `
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="background-color: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
                    <h2>Welcome to Our App</h2>
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) is:</p>
                    <h1 style="color: #007bff;">${otp}</h1>
                    <p>This code is valid for 90 seconds. Do not share it with anyone.</p>
                </div>
                </body>
                </html>
                ` 
        }
        try {
            await transport.sendMail(options)
            console.log('email Sent Successfullt')
        }
        catch (error){
            console.log('email couldnt send due to ',error)
        }
    }
}
