import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty()
    cardNumber: string
    
    @ApiProperty()
    cardType: string;

    @ApiProperty()
    cvv: number;

    @ApiProperty()
    expiryDate: Date;    
}
