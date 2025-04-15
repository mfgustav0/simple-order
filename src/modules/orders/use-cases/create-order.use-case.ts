import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { OrderStatus } from '../enums/order.status';

@Injectable()
export class CreateOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Output> {
    const order = await this.orderRepository.create({
      clientName: input.clientName,
      status: OrderStatus.Pendent,
    });

    return {
      orderId: order._id.toString(),
    };
  }
}

type Input = {
  clientName: string;
};

type Output = {
  orderId: string;
};
