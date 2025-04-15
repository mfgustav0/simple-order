import { ApiProperty } from '@nestjs/swagger';
import { StockType } from '../enums/stock-type.enum';
import { Stock } from '../entities/stock.entity';
import { ProductResponse } from './product-response.dto';
import { Product } from '../entities/product.entity';

export class StockResponse {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly productId: string;

  @ApiProperty({ required: false, type: ProductResponse })
  readonly product: ProductResponse | null;

  @ApiProperty()
  readonly type: StockType;

  @ApiProperty()
  readonly date: Date;

  @ApiProperty()
  readonly quantity: number;

  constructor(
    id: string,
    productId: string,
    product: ProductResponse | null,
    type: StockType,
    date: Date,
    quantity: number,
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.type = type;
    this.date = date;
    this.quantity = quantity;
  }

  static fromEntity(stock: Stock) {
    const product =
      stock.productId?._id != undefined
        ? ProductResponse.fromEntity(stock.productId as unknown as Product)
        : null;
    const productId =
      stock.productId?._id != undefined
        ? stock.productId._id.toString()
        : stock.productId.toString();

    return new StockResponse(
      stock._id.toString(),
      productId,
      product,
      stock.type,
      stock.date,
      stock.quantity,
    );
  }
}
