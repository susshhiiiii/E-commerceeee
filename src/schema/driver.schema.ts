import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class DriverField {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  licenceNumber: string;

  @Prop()
  carNumber: string;

  @Prop([{ type: Types.ObjectId, ref: 'Order' }])
  order:Types.ObjectId[];

  @Prop()
  status: Status;

  @Prop()
  createdBy: string;

}

export const DriverFieldSchema = SchemaFactory.createForClass(DriverField);
