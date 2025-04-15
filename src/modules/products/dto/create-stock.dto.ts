import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StockType } from '../enums/stock-type.enum';

export class CreateStockDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    enum: StockType,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(StockType)
  type: StockType;

  @ApiProperty()
  @IsDateString()
  date: Date;
}
