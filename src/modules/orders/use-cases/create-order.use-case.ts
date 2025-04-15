import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { OrderStatus } from '../enums/order.status';
import { ApiProperty } from '@nestjs/swagger';

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

export class Output {
  @ApiProperty()
  orderId: string;
}
