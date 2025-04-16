import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrderStatus } from '../enums/order.status';

export class OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;

  constructor(
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number,
    total: number,
  ) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.total = total;
  }

  static create(
    productId: string,
    name: string,
    price: number,
    quantity: number,
  ) {
    const id = new Date().getTime() % 2 ** 32;
    const total = price * quantity;

    return new OrderItem(
      id.toString(),
      productId,
      name,
      price,
      quantity,
      total,
    );
  }
}

@Schema({
  collection: 'orders',
})
export class Order {
  _id: Types.ObjectId;

  @Prop({ required: true })
  clientName: string;

  @Prop({ type: String, enum: OrderStatus, required: true, index: true })
  status: OrderStatus;

  @Prop({ type: Number, required: true, default: 0 })
  total: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Date })
  finishDate: Date | null;

  @Prop({ type: [{ type: Object }] })
  items: OrderItem[];
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
