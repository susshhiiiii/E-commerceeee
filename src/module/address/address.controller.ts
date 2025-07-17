import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddAdressDto } from './dto/addAdress.dto';
import { AddressService } from './address.service';
import { Request } from 'express';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/role.decorator';
import { UpdateAdressDto } from './dto/updateAdress.dto';

@Roles(Role.CUSTOMER)
@ApiTags('Address')
@Controller('address')
export class AddressController {

    constructor(private addressService:AddressService){}
    @Post()
    @ApiBearerAuth()
    @ApiOperation({summary:'Api route for Creating a new address by user'})
    async addAddress(@Req()req:Request,@Body()addAdressRequest:AddAdressDto) {
        const user = await req['user']
        return this.addressService.addAddress(user,addAdressRequest)
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({summary:'Api route for getting all the addresses of user'})
    async getAddress(@Req() req: Request) {
        const user = await req['user']
        return this.addressService.getAdress(user)
    }

    @Put()
    @ApiBearerAuth()
    @ApiOperation({summary:'Api route for updating address of user'})
    async updateAdress(@Req() req: Request,@Body()  updateAdressDto:UpdateAdressDto) {
        const user = await req['user']
        return this.addressService.updateAdress(user,updateAdressDto)
    }

    @ApiOperation({summary:'Api route for deleting address of user'})
    @Delete(':id')
    @ApiBearerAuth()
    async deleteAdress(@Req() req: Request, @Param('id') id: string) {
        const user=await req['user']
        return this.addressService.deleteAddress(user,id)
    }

    @Get(':id')
    @ApiOperation({summary:'Api route for address of user by its id'})
    @ApiBearerAuth()
    async getAddressById(@Req() req: Request, @Param('id') id: string) {
        const user=await req['user']
        return this.addressService.getAdressById(user,id)
    }
}
