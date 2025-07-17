import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop()
  brand: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory' })
  subCategory: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  quantity: number  

  @Prop()
  markedPrice: number;

  @Prop()
  discountedPercentage: number;

  @Prop({ type: Types.ObjectId, ref: 'InventoryItem' })
  inventoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
  
  @Prop({default:Status.ACTIVE})
  status: Status;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
