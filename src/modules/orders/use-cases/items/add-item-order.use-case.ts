import { OrderRepository } from '../../repositories/order.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '../../enums/order.status';
import { OrderItem } from '../../entities/order.entity';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class AddItemOrder {
  constructor(
    readonly orderRepository: OrderRepository,
    readonly productService: ProductsService,
  ) {}

  async execute(input: Input): Promise<OrderItem> {
    const order = await this.orderRepository.findById(input.orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.Pendent) {
      throw new NotAcceptableException('Order not allowed to append item');
    }

    const product = await this.productService.findOne(input.productId);

    const item = OrderItem.create(
      product._id.toString(),
      product.name,
      product.price,
      input.quantity,
    );

    order.items.push(item);

    await this.orderRepository.updateItems(order);

    return item;
  }
}

type Input = {
  orderId: string;
  productId: string;
  quantity: number;
};
