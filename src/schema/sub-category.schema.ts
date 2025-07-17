import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class SubCategory {
  @Prop()
  name: string;

  @Prop({ type:Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;
    
  @Prop({ type:Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop()
  status: Status;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
