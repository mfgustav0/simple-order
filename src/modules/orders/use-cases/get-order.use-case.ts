import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class GetOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Order> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}

type Input = {
  orderId: string;
};
