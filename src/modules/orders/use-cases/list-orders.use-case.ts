import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { OrderStatus } from '../enums/order.status';
import { Order } from '../entities/order.entity';

@Injectable()
export class ListOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Order[]> {
    let orders: Order[] = [];
    if (input.status) {
      orders = await this.orderRepository.findAllByStatus(
        input.userId,
        input.status,
      );
    } else {
      orders = await this.orderRepository.findAllByUserId(input.userId);
    }

    return orders;
  }
}

type Input = {
  userId: string;
  status: OrderStatus | null;
};
