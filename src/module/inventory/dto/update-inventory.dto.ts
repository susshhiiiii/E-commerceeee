import { ApiProcessingResponse, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
    @ApiProperty()
    id:string
}
