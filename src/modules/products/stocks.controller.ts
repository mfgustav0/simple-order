import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { StockResponse } from './dto/stock-response.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('stocks-products')
@UseGuards(AuthGuard)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: StockResponse,
  })
  async create(@Body() createStockDto: CreateStockDto): Promise<StockResponse> {
    const stock = await this.stocksService.create(createStockDto);

    return StockResponse.fromEntity(stock);
  }

  @Get()
  @ApiOkResponse({
    type: StockResponse,
    isArray: true,
  })
  async findAll(): Promise<StockResponse[]> {
    const stocks = await this.stocksService.findAll();

    return stocks.map((stock) => StockResponse.fromEntity(stock));
  }

  @Get('product/:productId')
  @ApiOkResponse({
    type: StockResponse,
    isArray: true,
  })
  async findAllByProductId(
    @Param('productId') id: string,
  ): Promise<StockResponse[]> {
    const stocks = await this.stocksService.findAllByProductId(id);

    return stocks.map((stock) => StockResponse.fromEntity(stock));
  }

  @Get(':id')
  @ApiOkResponse({
    type: StockResponse,
  })
  async findOne(@Param('id') id: string): Promise<StockResponse> {
    const stock = await this.stocksService.findOne(id);

    return StockResponse.fromEntity(stock);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.stocksService.remove(id);
  }
}
