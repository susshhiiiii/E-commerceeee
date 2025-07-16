import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name)private userModel:Model<User>) { }
    
    async findUserByEmail(email:string) {
        return await this.userModel.findOne({email})
    }
}
