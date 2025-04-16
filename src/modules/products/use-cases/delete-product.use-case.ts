import { Injectable, NotFoundException } from '@nestjs/common';
import { StockRepository } from '../repositories/stock.repository';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class DeleteProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly stockRepository: StockRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const product = await this.productRepository.findOne(input.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(product._id.toString());

    await this.stockRepository.removeAllByProductId(product._id.toString());
  }
}

type Input = {
  productId: string;
};
