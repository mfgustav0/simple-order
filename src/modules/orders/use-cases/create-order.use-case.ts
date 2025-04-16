import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';

@Injectable()
export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Order> {
    const order = await this.orderRepository.create({
      clientName: input.clientName,
      date: input.date,
    });

    return order;
  }
}

type Input = {
  clientName: string;
  date: Date;
};
