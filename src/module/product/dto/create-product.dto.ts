import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    brand: string
    
    @ApiProperty()
    @IsString()
    name:string
    
    @ApiProperty({type:String})
    category: Types.ObjectId

    @ApiProperty({type:String})
    subCategory: Types.ObjectId

    @ApiProperty()
    @IsNumber()
    quantity: number
    
    @ApiProperty()
    @IsNumber()
    markedPrice: number
    
    @ApiProperty()
    @IsNumber()
    discountedPercentage: number
    
    @ApiProperty({ type: String })
    inventoryId:Types.ObjectId
}
