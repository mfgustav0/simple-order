import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { CreateStock } from './use-cases/create-stock.use-cases';
import { StockRepository } from './repositories/stock.repository';
import { Stock } from './entities/stock.entity';
import { RemoveStock } from './use-cases/remove-stock.use-cases';

@Injectable()
export class StocksService {
  constructor(
    private readonly createStock: CreateStock,
    private readonly removeStock: RemoveStock,
    private readonly stockRepository: StockRepository,
  ) {}

  create(createStockDto: CreateStockDto): Promise<Stock> {
    return this.createStock.execute(createStockDto);
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepository.findAll();
  }

  findAllByProductId(productId: string): Promise<Stock[]> {
    return this.stockRepository.findAllByProductId(productId);
  }

  async findOne(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findOne(id);
    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    return stock;
  }

  async remove(id: string): Promise<void> {
    await this.removeStock.execute({
      stockId: id,
    });
  }
}
