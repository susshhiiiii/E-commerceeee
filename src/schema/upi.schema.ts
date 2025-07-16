import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Upi {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  upiId: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const UpiSchema = SchemaFactory.createForClass(Upi);
