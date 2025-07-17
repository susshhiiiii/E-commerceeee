import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"
import { Status } from "src/enum/status.enum"

@Schema({ timestamps: true })
export class InventoryItem extends Document{
    @Prop({ type: Types.ObjectId, ref:'Product'})
    product: Types.ObjectId
    
    @Prop()
    quantity: number
    
    @Prop()
    createdBy?: Types.ObjectId
    
    @Prop({enum:Status,default:Status.ACTIVE})
    status:Status
}

export const InventorySchema = SchemaFactory.createForClass(InventoryItem)
