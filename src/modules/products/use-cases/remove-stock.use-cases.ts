import { Injectable, NotFoundException } from '@nestjs/common';
import { StockType } from '../enums/stock-type.enum';
import { StockRepository } from '../repositories/stock.repository';
import { ProductsService } from '../products.service';

@Injectable()
export class RemoveStock {
  constructor(
    private readonly productService: ProductsService,
    private readonly stockRepository: StockRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const stock = await this.stockRepository.findOne(input.stockId);
    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    const product = await this.productService.findOne(
      stock.productId._id.toString(),
    );

    let quantity = stock.quantity;
    if (stock.type === StockType.Increment) {
      quantity *= -1;
    }

    await this.productService.updateQuantity(product._id.toString(), quantity);

    await this.stockRepository.delete(stock._id.toString());
  }
}

type Input = {
  stockId: string;
};
