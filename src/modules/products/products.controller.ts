import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponse } from './dto/product-response.dto';
import { Product } from './entities/product.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: ProductResponse,
  })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    const product = await this.productsService.create(createProductDto);

    return ProductResponse.fromEntity(product);
  }

  @Get()
  @ApiOkResponse({
    type: ProductResponse,
    isArray: true,
  })
  async findAll(): Promise<ProductResponse[]> {
    const products = await this.productsService.findAll();

    return products.map((product: Product) =>
      ProductResponse.fromEntity(product),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    type: ProductResponse,
  })
  async findOne(@Param('id') id: string): Promise<ProductResponse> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductResponse.fromEntity(product);
  }

  @Patch(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(id);
  }
}
