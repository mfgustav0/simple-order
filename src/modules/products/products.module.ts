import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repositories/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { StocksController } from './stocks.controller';
import { StockRepository } from './repositories/stock.repository';
import { StocksService } from './stocks.service';
import { CreateStock } from './use-cases/create-stock.use-cases';
import { Stock, StockSchema } from './entities/stock.entity';
import { RemoveStock } from './use-cases/remove-stock.use-cases';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  controllers: [ProductsController, StocksController],
  providers: [
    ProductRepository,
    ProductsService,
    StockRepository,
    StocksService,
    CreateStock,
    RemoveStock,
  ],
})
export class ProductsModule {}
