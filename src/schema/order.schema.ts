import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { DeliveryStatus } from "src/enum/deliveryStatus.enum";
import { PaymentMethod } from "src/enum/paymentMethod.enum";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Order {
  @Prop({ type:Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  product: Types.ObjectId[];

  @Prop()
  totalAmount: number;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Types.ObjectId;

  @Prop({ enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Prop({ type: Types.ObjectId, ref: 'DriverField' })
  driver: Types.ObjectId;

  @Prop()
  deliveryStatus: DeliveryStatus;

  @Prop({default:false})
  isPaid:boolean;

  @Prop()
  deliveredDate?: Date;

  @Prop()
  createdBy: string;
  @Prop()
  status: Status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
