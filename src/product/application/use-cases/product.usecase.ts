import {
  ParamsEntity,
  ProductEntity,
} from 'src/product/domain/entities/product.entity';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';

export class ProductUseCase implements ProductRepository {
  private static _instance: ProductUseCase;

  constructor(private readonly productRepository: ProductRepository) {}

  public static getInstance(instance: ProductRepository): ProductUseCase {
    if (!this._instance) this._instance = new this(instance);
    return this._instance;
  }

  getAllProducts(params: ParamsEntity): Promise<ProductEntity[]> {
    return this.productRepository.getAllProducts(params);
  }

  getOneProduct(productId: string): Promise<ProductEntity> {
    return this.productRepository.getOneProduct(productId);
  }

  createProduct(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.createProduct(product);
  }

  updateProduct(
    productId: string,
    product: ProductEntity,
  ): Promise<ProductEntity> {
    return this.productRepository.updateProduct(productId, product);
  }

  removeProduct(productId: string): Promise<ProductEntity> {
    return this.productRepository.removeProduct(productId);
  }
}
