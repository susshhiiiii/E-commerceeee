import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCateoryDto {
    @ApiProperty()
    @IsString()
    name:string
}
