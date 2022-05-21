import {
  ParamsEntity,
  ProductEntity,
} from 'src/product/domain/entities/product.entity';

export interface ProductRepository {
  getAllProducts(params?: ParamsEntity): Promise<ProductEntity[]>;
  getOneProduct(productId: string): Promise<ProductEntity>;
  createProduct(product: ProductEntity): Promise<ProductEntity>;
  updateProduct(
    productId: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  removeProduct(productId: string): Promise<ProductEntity>;
}
