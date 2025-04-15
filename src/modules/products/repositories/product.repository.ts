import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);

    return createdProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
      $set: {
        name: updateProductDto.name,
        price: updateProductDto.price,
      },
    });
    if (!updatedProduct) {
      throw new Error('Error on update');
    }
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: string): Promise<Product | null> {
    return this.productModel
      .findOne({
        _id: id,
      })
      .exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel
      .deleteOne({
        _id: id,
      })
      .exec();

    if (result.deletedCount == 0) {
      throw new Error('Error on delete');
    }
  }
}
