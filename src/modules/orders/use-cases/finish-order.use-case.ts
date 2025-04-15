import { OrderRepository } from '../repositories/order.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '../enums/order.status';

@Injectable()
export class FinishOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.Pendent) {
      throw new NotAcceptableException('Order not allowed');
    }

    await this.orderRepository.updateStatus(
      order._id.toString(),
      OrderStatus.Finished,
    );
  }
}

type Input = {
  orderId: string;
};
