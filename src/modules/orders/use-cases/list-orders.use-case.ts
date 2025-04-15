import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order.status';
import { Order } from '../entities/order.entity';

@Injectable()
export class ListOrders {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Output[]> {
    let orders: Order[] = [];
    if (input.status) {
      orders = await this.orderRepository.findAllByStatus(input.status);
    } else {
      orders = await this.orderRepository.findAll();
    }

    return orders.map((order) => {
      return {
        orderId: order._id.toString(),
        clientName: order.clientName.toString(),
        status: order.status.toString(),
      };
    });
  }
}

type Input = {
  status: OrderStatus | null;
};

export class Output {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  status: string;
}
