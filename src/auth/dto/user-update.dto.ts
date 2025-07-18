import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Role } from "src/enum/role.enum"

export class UserUpdateDto{

    @ApiProperty()
    @IsString()
    id:string

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