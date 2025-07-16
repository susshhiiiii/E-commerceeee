import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/enum/role.enum';
import { Status } from 'src/enum/status.enum';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })  
    email: string;
    
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;
    
    @Prop()
    otp?: string

    @Prop()
    otpEnteredTime?:Date      
        
    @Prop({type:Types.ObjectId,ref:'DriverField'})
    driverField?: Types.ObjectId
    
    @Prop({ type: Types.ObjectId, ref: 'ConsumerField' })
    consumerField?: Types.ObjectId
    
    @Prop({type:Types.ObjectId,ref:'VendorField'})
    vendorField?: Types.ObjectId
    
    @Prop({ type:Types.ObjectId, ref: 'Address' })
    address?:Types.ObjectId;

    @Prop({ type:[String],enum: Role, required: true,default:[] })
    role: Role[];  
    @Prop()
    createdBy?: string;

    @Prop({enum:Status,default:Status.ACTIVE})
    status: Status;    
}    
export const UserSchema = SchemaFactory.createForClass(User);
