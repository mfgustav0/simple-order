import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateItemOrderDto } from './dtos/create-item-order.dto';
import { OrderItemsService } from './order-items.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OrderItemResponse } from './dtos/order-response.dto';

@ApiTags('Orders')
@Controller('orders-items')
export class OrderItemsController {
  constructor(readonly orderItemService: OrderItemsService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderItemResponse,
  })
  @HttpCode(201)
  async create(
    @Body() createItemOrderDto: CreateItemOrderDto,
  ): Promise<OrderItemResponse> {
    const item = await this.orderItemService.create(createItemOrderDto);

    return OrderItemResponse.fromEntity(item);
  }

  @Delete(':orderId/:itemId')
  @HttpCode(204)
  async remove(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
  ): Promise<void> {
    await this.orderItemService.remove(orderId, itemId);
  }
}
