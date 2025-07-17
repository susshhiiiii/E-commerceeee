import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateSubCategoryDto {
    @ApiProperty()
    @IsString()
    name: string
    
    @ApiProperty({ type: String, description: 'Category ObjectId' })
    category: Types.ObjectId;   
}
