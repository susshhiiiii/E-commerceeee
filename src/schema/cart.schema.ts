import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  product: Types.ObjectId[];

  @Prop()
  totalAmount: number;

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
