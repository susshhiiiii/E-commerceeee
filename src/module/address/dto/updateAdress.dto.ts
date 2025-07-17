import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdressDto{

    @ApiProperty()
    id:string

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