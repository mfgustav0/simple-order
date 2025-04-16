import { OrderRepository } from '../repositories/order.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '../enums/order.status';
import { StockType } from 'src/modules/products/enums/stock-type.enum';
import { OrderItem } from '../entities/order.entity';
import { StocksService } from 'src/modules/products/stocks.service';

@Injectable()
export class FinishOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly stocksService: StocksService,
  ) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.Pendent) {
      throw new NotAcceptableException('Order not allowed');
    }

    order.items.forEach(async (item: OrderItem) => {
      await this.stocksService.create({
        productId: item.productId,
        type: StockType.Decrement,
        date: new Date(),
        quantity: item.quantity,
      });
    });

    order.status = OrderStatus.Finished;
    order.finishDate = new Date();

    await this.orderRepository.update(order);
  }
}

type Input = {
  orderId: string;
};
