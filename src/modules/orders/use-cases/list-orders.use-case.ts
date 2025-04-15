import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class ListOrders {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Output[]> {
    const orders = await this.orderRepository.findAll();

    return orders.map((order) => {
      return {
        orderId: order._id.toString(),
        clientName: order.clientName.toString(),
        status: order.status.toString(),
      };
    });
  }
}

type Output = {
  orderId: string;
  clientName: string;
  status: string;
};
