import { Injectable } from '@nestjs/common';
import { StockType } from '../enums/stock-type.enum';
import { StockRepository } from '../repositories/stock.repository';
import { Stock } from '../entities/stock.entity';
import { ProductsService } from '../products.service';

@Injectable()
export class CreateStock {
  constructor(
    private readonly productService: ProductsService,
    private readonly stockRepository: StockRepository,
  ) {}

  async execute(input: Input): Promise<Stock> {
    const product = await this.productService.findOne(input.productId);

    let quantity = input.quantity;
    if (input.type === StockType.Decrement) {
      quantity *= -1;
    }

    await this.productService.updateQuantity(product._id.toString(), quantity);

    const stock = await this.stockRepository.create({
      productId: product._id.toString(),
      type: input.type,
      quantity: input.quantity,
      date: input.date,
    });

    return stock;
  }
}

type Input = {
  productId: string;
  type: StockType;
  date: Date;
  quantity: number;
};
