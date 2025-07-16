import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Inventory{
    @Prop({ type: Types.ObjectId, ref:'User'})
    userId: Types.ObjectId

    @Prop({type:Types.ObjectId,ref:'Product'})
    product: Types.ObjectId[]
    
    @Prop()
    totalsale: number
    
    @Prop()
    createdBy?: Types.ObjectId
    
    @Prop({enum:Status,default:Status.ACTIVE})
    status:Status
}