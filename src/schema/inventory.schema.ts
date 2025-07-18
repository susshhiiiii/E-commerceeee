import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Inventory{
    @Prop()
    name: string
    
    @Prop({ type: Types.ObjectId, ref:'User'})
    userId: Types.ObjectId
    
    @Prop({default:0})
    inventorySale: number
    
    @Prop()
    createdBy?: Types.ObjectId
    
    @Prop({enum:Status,default:Status.ACTIVE})
    status:Status
}

export const InventorySchema=SchemaFactory.createForClass(Inventory)