import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class HasStock {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<boolean> {
    const product = await this.productRepository.findOne(input.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const newQuantity = product.stock_quantity - input.quantity;

    return newQuantity >= 0;
  }
}

type Input = {
  productId: string;
  quantity: number;
};
