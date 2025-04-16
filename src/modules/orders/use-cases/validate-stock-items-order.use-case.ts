import { OrderRepository } from '../repositories/order.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { StocksService } from 'src/modules/products/stocks.service';

@Injectable()
export class ValidateStockItemsOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stocksService: StocksService,
  ) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const items: ItemsCheck[] = [];
    for (const item of order.items) {
      if (!items[item.productId]) {
        items[item.productId] = {
          productId: item.productId,
          name: item.name,
          quantity: 0,
        };
      }

      items[item.productId].quantity += item.quantity;
    }

    for (const key in items) {
      const item = items[key];

      const hasStock = await this.stocksService.hasStockForProduct(item);
      if (!hasStock) {
        throw new NotAcceptableException(
          `Product [${item.name}] not has stock`,
        );
      }
    }
  }
}

type Input = {
  orderId: string;
};

type ItemsCheck = {
  productId: string;
  name: string;
  quantity: number;
};
