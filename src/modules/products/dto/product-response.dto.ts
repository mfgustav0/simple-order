import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class ProductResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly stock_quantity: number;

  constructor(id: string, name: string, price: number, stock_quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock_quantity = stock_quantity;
  }

  static fromEntity(product: Product) {
    return new ProductResponse(
      product._id.toString(),
      product.name,
      product.price,
      product.stock_quantity,
    );
  }
}
