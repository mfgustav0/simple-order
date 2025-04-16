import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListOrderDto } from './dtos/list-order.dto';
import { OrderResponse } from './dtos/order-response.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @ApiOkResponse({
    type: OrderResponse,
    isArray: true,
  })
  async findAll(@Query() listOrderDto: ListOrderDto): Promise<OrderResponse[]> {
    const orders = await this.orderService.findAll(listOrderDto);

    return orders.map((order) => OrderResponse.fromEntity(order));
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: OrderResponse,
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponse> {
    const order = await this.orderService.create(createOrderDto);

    return OrderResponse.fromEntity(order);
  }

  @Get(':id')
  @ApiOkResponse({
    type: OrderResponse,
  })
  async findById(@Param('id') orderId: string): Promise<OrderResponse> {
    const order = await this.orderService.findById(orderId);

    return OrderResponse.fromEntity(order);
  }

  @Patch(':id/finish')
  @ApiOkResponse({
    type: OrderResponse,
  })
  async finish(@Param('id') orderId: string): Promise<OrderResponse> {
    const order = await this.orderService.finish(orderId);

    return OrderResponse.fromEntity(order);
  }
}
