import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Status } from "src/enum/status.enum";

@Schema({ timestamps: true })
export class VendorProfile {
  @Prop({ type:Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([{ type: [Types.ObjectId], ref: 'InventoryItem' }])
  inventory: Types.ObjectId[];

  @Prop()
  totalSale: number;

  @Prop()
  createdBy: string;

  @Prop()
  status: Status;
}

export const VendorFieldSchema = SchemaFactory.createForClass(VendorProfile);
