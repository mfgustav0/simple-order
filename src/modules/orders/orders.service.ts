import { Injectable } from '@nestjs/common';
import { ListOrders } from './use-cases/list-orders.use-case';
import { CreateOrder } from './use-cases/create-order.use-case';
import { GetOrder } from './use-cases/get-order.use-case';
import { FinishOrder } from './use-cases/finish-order.use-case';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ListOrderDto } from './dtos/list-order.dto';
import { Order } from './entities/order.entity';
import { ValidateStockItemsOrder } from './use-cases/validate-stock-items-order.use-case';

@Injectable()
export class OrdersService {
  constructor(
    private readonly listOrders: ListOrders,
    private readonly createOrder: CreateOrder,
    private readonly getOrder: GetOrder,
    private readonly validateStockItemsOrder: ValidateStockItemsOrder,
    private readonly finishOrder: FinishOrder,
  ) {}

  create(createOrderDto: CreateOrderDto & { userId: string }): Promise<Order> {
    return this.createOrder.execute(createOrderDto);
  }

  async findAll(
    listOrderDto: ListOrderDto & { userId: string },
  ): Promise<Order[]> {
    return this.listOrders.execute(listOrderDto);
  }

  findById(id: string, userId: string): Promise<Order> {
    return this.getOrder.execute({
      orderId: id,
      userId,
    });
  }

  async finish(id: string, userId: string): Promise<Order> {
    await this.validateStockItemsOrder.execute({
      orderId: id,
      userId,
    });

    await this.finishOrder.execute({
      orderId: id,
      userId,
    });

    return this.getOrder.execute({
      orderId: id,
      userId,
    });
  }
}
