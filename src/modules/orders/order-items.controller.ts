import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateItemOrderDto } from './dtos/create-item-order.dto';
import { OrderItemsService } from './order-items.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OrderItemResponse } from './dtos/order-response.dto';
import { AuthGuard, UserToken } from '../auth/auth.guard';
import { Request as RequestExpress } from 'express';

@ApiTags('Orders')
@Controller('orders-items')
@UseGuards(AuthGuard)
export class OrderItemsController {
  constructor(readonly orderItemService: OrderItemsService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderItemResponse,
  })
  @HttpCode(201)
  async create(
    @Body() createItemOrderDto: CreateItemOrderDto,
    @Request() req: RequestExpress & { user: UserToken },
  ): Promise<OrderItemResponse> {
    const item = await this.orderItemService.create({
      ...createItemOrderDto,
      userId: req.user.id,
    });

    return OrderItemResponse.fromEntity(item);
  }

  @Delete(':orderId/:itemId')
  @HttpCode(204)
  async remove(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @Request() req: RequestExpress & { user: UserToken },
  ): Promise<void> {
    await this.orderItemService.remove(orderId, req.user.id, itemId);
  }
}
