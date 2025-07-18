import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { Types } from 'mongoose';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {

    @ApiProperty({type:String,default:'id'})
    
    id:Types.ObjectId
}
