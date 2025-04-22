import { Injectable, NotAcceptableException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order.status';

@Injectable()
export class CreateOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Order> {
    const ordersActive = await this.orderRepository.findAllByStatus(
      input.userId,
      OrderStatus.Pendent,
    );
    if (ordersActive.length > 0) {
      throw new NotAcceptableException('Has order opened');
    }

    const order = await this.orderRepository.create({
      userId: input.userId,
      date: input.date,
    });

    return order;
  }
}

type Input = {
  userId: string;
  date: Date;
};
