import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  GetOrder,
  Output as OutputGetOrder,
} from './use-cases/get-order.use-case';
import {
  ListOrders,
  Output as OutputListOrders,
} from './use-cases/list-orders.use-case';
import {
  CreateOrder,
  Output as OutputCreateOrder,
} from './use-cases/create-order.use-case';
import { FinishOrder } from './use-cases/finish-order.use-case';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListOrderDto } from './dtos/list-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    readonly listOrders: ListOrders,
    readonly createOrder: CreateOrder,
    readonly getOrder: GetOrder,
    readonly finishOrder: FinishOrder,
  ) {}

  @Get()
  @ApiOkResponse({
    type: OutputListOrders,
    isArray: true,
  })
  findAll(@Query() listOrderDto: ListOrderDto): Promise<OutputListOrders[]> {
    return this.listOrders.execute(listOrderDto);
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: OutputCreateOrder,
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<OutputCreateOrder> {
    return this.createOrder.execute(createOrderDto);
  }

  @Get(':id')
  @ApiOkResponse({
    type: OutputGetOrder,
  })
  findById(@Param('id') orderId: string): Promise<OutputGetOrder> {
    return this.getOrder.execute({ orderId });
  }

  @Put(':id/finish')
  @HttpCode(204)
  async finish(@Param('id') orderId: string) {
    await this.finishOrder.execute({ orderId });
  }
}
