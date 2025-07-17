import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Address extends Document{

  @Prop()
  userid: string

  @Prop()
  country: string;

  @Prop()
  pincode: number;

  @Prop()
  city: string;

  @Prop()
  location: string;

  @Prop()
  phoneNumber: string;

  @Prop({type:Types.ObjectId,ref:'User'})
  createdBy: Types.ObjectId;

  @Prop()
  status: Status;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
