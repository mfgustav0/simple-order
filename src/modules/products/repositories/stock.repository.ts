import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from '../entities/stock.entity';
import { CreateStockDto } from '../dto/create-stock.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class StockRepository {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const createdStock = new this.stockModel(createStockDto);

    return createdStock.save();
  }

  async findAllByProductId(productId: string): Promise<Stock[]> {
    if (!Types.ObjectId.isValid(productId)) {
      return [];
    }

    return await this.stockModel
      .find({
        productId: productId,
      })
      .exec();
  }

  findAll(): Promise<Stock[]> {
    return this.stockModel
      .find()
      .populate<{ product: Product }>('productId')
      .exec();
  }

  async findOne(id: string): Promise<Stock | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return await this.stockModel
      .findOne({
        _id: id,
      })
      .populate<{ product: Product }>('productId')
      .exec();
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid parameter');
    }

    const result = await this.stockModel
      .deleteOne({
        _id: id,
      })
      .exec();

    if (result.deletedCount == 0) {
      throw new Error('Error on delete');
    }
  }

  async removeAllByProductId(productId: string): Promise<void> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid parameter');
    }

    await this.stockModel
      .deleteMany({
        productId: productId,
      })
      .exec();
  }
}
