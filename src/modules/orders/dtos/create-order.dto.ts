import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;
}
