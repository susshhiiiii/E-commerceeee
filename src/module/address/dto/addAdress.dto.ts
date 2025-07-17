import { ApiProperty } from "@nestjs/swagger";

export class AddAdressDto{
    
    @ApiProperty()
    country: string
    
    @ApiProperty()
    pincode: number
    
    @ApiProperty()
    city: string
    
    @ApiProperty()
    location: string;

    @ApiProperty()
    phoneNumber: string;
}