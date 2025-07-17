import { PartialType } from '@nestjs/swagger';
import { CreateCateoryDto } from './create-cateory.dto';

export class UpdateCateoryDto extends PartialType(CreateCateoryDto) {}
