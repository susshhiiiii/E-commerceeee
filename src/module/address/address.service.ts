import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address } from 'src/schema/address.schema';
import { AddAdressDto } from './dto/addAdress.dto';
import { User } from 'src/schema/user.schema';
import { UpdateAdressDto } from './dto/updateAdress.dto';

@Injectable()
export class AddressService {
    constructor(@InjectModel(Address.name) private addressModel: Model<Address>) { }
    
    async addAddress(user:Request,addAdressRequest: AddAdressDto) {
        const address = new this.addressModel(addAdressRequest)
        address.userid = user['sub']
        address.createdBy = user['sub']
        
        await address.save()
        return address
    }

    async getAdress(user: Request) {
        const address = await this.addressModel.find({ userid: user['sub'] })
        return address
    }

    async getAdressById(user: Request, id: string) {
        const adresss = await this.addressModel.findById(id)
        
        if (!adresss)
            throw new HttpException('No address found with the given id', 404)
        
        if (adresss.userid != user['sub'])
            throw new UnauthorizedException()

        return adresss
    }
    async updateAdress(user: Request, updateAdressreq: UpdateAdressDto) {
        const adresss = await this.addressModel.findById(updateAdressreq.id)
        
        if (!adresss)
            throw new HttpException('No address found with the given id', 404)
        
        if (adresss.userid != user['sub'])
            throw new UnauthorizedException()

        const updatedAddress = await this.addressModel.findByIdAndUpdate(updateAdressreq.id, updateAdressreq, { new: true })
        return updatedAddress
    }

    async deleteAddress(user: Request, id: string) {
        const adresss = await this.addressModel.findById(id)
         if (!adresss)
            throw new HttpException('No address found with the given id', 404)
        
        if (adresss.userid != user['sub'])
            throw new UnauthorizedException()

        await this.addressModel.findByIdAndDelete(id)
        return {response:'Address has been deleted'}
    }


}
