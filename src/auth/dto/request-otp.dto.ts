import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RequestOtpDto{
    @ApiProperty()
    @IsString()
    email:string
}