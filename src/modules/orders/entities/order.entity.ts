import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrderStatus } from '../enums/order.status';

@Schema({
  collection: 'orders',
})
export class Order {
  _id: Types.ObjectId;

  @Prop({ required: true })
  clientName: string;

  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
