import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Role } from "src/enum/role.enum";

export class RegisterDto{
    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    password: string
        
    @ApiProperty()
    role:Role[]
}