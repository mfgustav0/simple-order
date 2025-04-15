/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
