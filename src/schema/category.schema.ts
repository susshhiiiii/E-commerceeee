import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Category {
  @Prop()
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'SubCategory' })
  subCategory?:Types.ObjectId[]
    
  @Prop()
  createdBy?: string

  @Prop({enum:Status,default:Status.ACTIVE})
  status: Status;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
