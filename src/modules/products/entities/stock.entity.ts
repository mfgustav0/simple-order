import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { StockType } from '../enums/stock-type.enum';

@Schema({
  collection: 'stocks',
})
export class Stock {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true, index: true })
  productId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({
    type: String,
    required: true,
    enum: StockType,
  })
  type: StockType;

  @Prop({ type: Date, required: true })
  date: Date;
}

export type StockDocument = HydratedDocument<Stock>;

export const StockSchema = SchemaFactory.createForClass(Stock);
