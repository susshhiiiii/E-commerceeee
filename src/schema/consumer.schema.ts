import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { PaymentMethod } from "src/enum/paymentMethod.enum";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class ConsumerProfile {
  @Prop({ type:Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order:Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Upi' })
  upi: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Card' })
  card: Types.ObjectId[];

  @Prop({ enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const ConsumerFieldSchema = SchemaFactory.createForClass(ConsumerProfile);
