import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetOrder } from './use-cases/get-order.use-case';
import { ListOrders } from './use-cases/list-orders.use-case';
import { CreateOrder } from './use-cases/create-order.use-case';
import { FinishOrder } from './use-cases/finish-order.use-case';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    readonly listOrders: ListOrders,
    readonly createOrder: CreateOrder,
    readonly getOrder: GetOrder,
    readonly finishOrder: FinishOrder,
  ) {}

  @Get()
  findAll() {
    return this.listOrders.execute();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrder.execute(createOrderDto);
  }

  @Get(':id')
  findById(@Param('id') orderId: string) {
    return this.getOrder.execute({ orderId });
  }

  @Put(':id/finish')
  @HttpCode(204)
  async finish(@Param('id') orderId: string) {
    await this.finishOrder.execute({ orderId });
  }
}
