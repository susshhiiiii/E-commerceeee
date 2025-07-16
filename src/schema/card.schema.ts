import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Card {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  cardNumber: string;

  @Prop()
  cardType: string;

  @Prop()
  cvv: number;

  @Prop()
  expiryDate: Date;

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const CardSchema = SchemaFactory.createForClass(Card);
