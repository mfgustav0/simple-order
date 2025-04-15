import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<Output> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      orderId: order._id.toString(),
      clientName: order.clientName,
      status: order.status.toString(),
    };
  }
}

type Input = {
  orderId: string;
};

export class Output {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  status: string;
}
