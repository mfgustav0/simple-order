import { Product } from '../entities/product.entity';

export class ProductResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
  ) {}

  static fromEntity(product: Product) {
    return new ProductResponse(
      product._id.toString(),
      product.name,
      product.price,
    );
  }
}
