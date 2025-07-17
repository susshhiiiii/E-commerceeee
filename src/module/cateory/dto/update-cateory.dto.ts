import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCateoryDto } from './create-cateory.dto';
import { Types } from 'mongoose';

export class UpdateCateoryDto extends PartialType(CreateCateoryDto) {
    @ApiProperty({type:String})
    id:Types.ObjectId
}
