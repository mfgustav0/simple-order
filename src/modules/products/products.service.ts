import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(readonly productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(product._id.toString());
  }
}
