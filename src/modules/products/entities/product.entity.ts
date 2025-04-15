import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  collection: 'products',
})
export class Product {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
