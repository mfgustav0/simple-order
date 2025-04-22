import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderItem } from '../entities/order.entity';

export class OrderItemResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly productId: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ type: Number })
  readonly price: number;

  @ApiProperty({ type: Number })
  readonly quantity: number;

  @ApiProperty({ type: Number })
  readonly total: number;

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

  static fromEntity(item: OrderItem) {
    return new OrderItemResponse(
      item.id,
      item.productId,
      item.name,
      item.price,
      item.quantity,
      item.total,
    );
  }
}

export class OrderResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly date: Date;

  @ApiProperty({ type: OrderItemResponse, isArray: true, required: false })
  readonly items: OrderItemResponse[];

  constructor(
    id: string,
    status: string,
    total: number,
    date: Date,
    items: OrderItemResponse[],
  ) {
    this.id = id;
    this.status = status;
    this.total = total;
    this.date = date;
    this.items = items;
  }

  static fromEntity(order: Order) {
    return new OrderResponse(
      order._id.toString(),
      order.status.toString(),
      order.total,
      order.date,
      order.items.map((item) => OrderItemResponse.fromEntity(item)),
    );
  }
}
