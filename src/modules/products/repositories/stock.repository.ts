import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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

  findAllByProductId(productId: string): Promise<Stock[]> {
    return this.stockModel
      .find({
        productId: productId,
      })
      .exec();
  }

  findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  findOne(id: string): Promise<Stock | null> {
    return this.stockModel
      .findOne({
        _id: id,
      })
      .populate<{ product: Product }>('productId')
      .exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.stockModel
      .deleteOne({
        _id: id,
      })
      .exec();

    if (result.deletedCount == 0) {
      throw new Error('Error on delete');
    }
  }
}
