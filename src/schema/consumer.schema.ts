import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class CustomerProfile {
  @Prop({ type:Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order?: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Address' })
  addresses?:Types.ObjectId[]

  @Prop({ type: Types.ObjectId, ref: 'Upi' })
  upi?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Card' })
  card?: Types.ObjectId[];  

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const CustomerFieldSchema = SchemaFactory.createForClass(CustomerProfile);
