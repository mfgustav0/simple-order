import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      stock_quantity: 0,
    });

    return createdProduct.save();
  }

  async update(product: Product): Promise<void> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      product._id,
      {
        $set: {
          name: product.name,
          price: product.price,
        },
      },
    );
    if (!updatedProduct) {
      throw new Error('Error on update');
    }
  }

  async updateQuantity(product: Product, quantity: number): Promise<void> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      product._id,
      {
        $inc: {
          stock_quantity: quantity,
        },
      },
    );
    if (!updatedProduct) {
      throw new Error('Error on update');
    }
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return await this.productModel.findById(id).exec();
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
