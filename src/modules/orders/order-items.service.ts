import { Injectable } from '@nestjs/common';
import { CreateItemOrderDto } from './dtos/create-item-order.dto';
import { AddItemOrder } from './use-cases/items/add-item-order.use-case';
import { RemoveItemOrder } from './use-cases/items/remove-item-order.use-case';
import { OrderItem } from './entities/order.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    readonly addItemOrder: AddItemOrder,
    readonly removeItemOrder: RemoveItemOrder,
  ) {}

  create(
    createProductDto: CreateItemOrderDto & { userId: string },
  ): Promise<OrderItem> {
    return this.addItemOrder.execute(createProductDto);
  }

  async remove(orderId: string, userId: string, itemId: string): Promise<void> {
    await this.removeItemOrder.execute({
      orderId,
      userId,
      itemId,
    });
  }
}
