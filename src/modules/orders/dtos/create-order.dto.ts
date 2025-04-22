import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;
}
