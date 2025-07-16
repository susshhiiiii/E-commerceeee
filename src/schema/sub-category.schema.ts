import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class SubCategory {
  @Prop()
  name: string;

  @Prop({ type:Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;
    
    @Prop()
    createdBy:string

  @Prop()
  status: Status;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
