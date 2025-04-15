import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order.status';

export class ListOrderDto {
  @ApiProperty({
    enum: OrderStatus,
    required: false,
  })
  status: OrderStatus | null;
}
