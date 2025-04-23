import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { CreateStock } from './use-cases/create-stock.use-cases';
import { StockRepository } from './repositories/stock.repository';
import { Stock } from './entities/stock.entity';
import { RemoveStock } from './use-cases/remove-stock.use-cases';
import { HasStock } from './use-cases/has-stock.use-case';
import { StockType } from './enums/stock-type.enum';

@Injectable()
export class StocksService {
  constructor(
    private readonly createStock: CreateStock,
    private readonly hasStock: HasStock,
    private readonly removeStock: RemoveStock,
    private readonly stockRepository: StockRepository,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    if (createStockDto.type === StockType.Decrement) {
      const hasStock = await this.hasStockForProduct({
        productId: createStockDto.productId,
        quantity: createStockDto.quantity,
      });
      if (!hasStock) {
        throw new NotAcceptableException(`Product not has stock`);
      }
    }

    return await this.createStock.execute(createStockDto);
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepository.findAll();
  }

  findAllByProductId(productId: string): Promise<Stock[]> {
    return this.stockRepository.findAllByProductId(productId);
  }

  hasStockForProduct(data: {
    productId: string;
    quantity: number;
  }): Promise<boolean> {
    return this.hasStock.execute({
      productId: data.productId,
      quantity: data.quantity,
    });
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
