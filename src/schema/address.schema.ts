import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Address extends Document{
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userid: Types.ObjectId;

  @Prop()
  country: string;

  @Prop()
  pincode: string;

  @Prop()
  city: string;

  @Prop()
  location: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
