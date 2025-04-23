import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListOrderDto } from './dtos/list-order.dto';
import { OrderResponse } from './dtos/order-response.dto';
import { OrdersService } from './orders.service';
import { AuthGuard, UserToken } from '../auth/auth.guard';
import { Request as RequestExpress } from 'express';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @ApiOkResponse({
    type: OrderResponse,
    isArray: true,
  })
  async findAll(
    @Query() listOrderDto: ListOrderDto,
    @Request() req: RequestExpress & { user: UserToken },
  ): Promise<OrderResponse[]> {
    const orders = await this.orderService.findAll({
      ...listOrderDto,
      userId: req.user.id,
    });

    return orders.map((order) => OrderResponse.fromEntity(order));
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: OrderResponse,
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: RequestExpress & { user: UserToken },
  ): Promise<OrderResponse> {
    const order = await this.orderService.create({
      ...createOrderDto,
      userId: req.user.id,
    });

    return OrderResponse.fromEntity(order);
  }

  @Get(':id')
  @ApiOkResponse({
    type: OrderResponse,
  })
  async findById(
    @Param('id') orderId: string,
    @Request() req: RequestExpress & { user: UserToken },
  ): Promise<OrderResponse> {
    const order = await this.orderService.findById(orderId, req.user.id);

    return OrderResponse.fromEntity(order);
  }

  @Patch(':id/finish')
  @ApiOkResponse({
    type: OrderResponse,
  })
  async finish(
    @Param('id') orderId: string,
    @Request() req: RequestExpress & { user: UserToken },
  ): Promise<OrderResponse> {
    const order = await this.orderService.finish(orderId, req.user.id);

    return OrderResponse.fromEntity(order);
  }
}
