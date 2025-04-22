import { OrderRepository } from '../../repositories/order.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '../../enums/order.status';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class RemoveItemOrder {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly productService: ProductsService,
  ) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findByIdFromUser(
      input.orderId,
      input.userId,
    );
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.Pendent) {
      throw new NotAcceptableException('Order not allowed to append item');
    }

    const productIndex = order.items.findIndex(
      (item) => item.id === input.itemId,
    );
    if (productIndex < 0) {
      throw new NotFoundException('Item not found');
    }

    order.items.splice(productIndex, 1);

    await this.orderRepository.updateItems(order);
  }
}

type Input = {
  orderId: string;
  userId: string;
  itemId: string;
};
