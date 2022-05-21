import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ProductEntity } from 'src/product/domain/entities/product.entity';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';
import { ProductUseCase } from 'src/product/application/use-cases/product.usecase';
import { FilterProduct } from 'src/product/infrastructure/dtos/filterProduct';
import { ProductService } from 'src/product/infrastructure/services/product/product.service';

@Controller('products')
export class ProductController implements ProductRepository {
  constructor(
    private readonly productUseCase: ProductUseCase,
    private readonly productService: ProductService,
  ) {
    this.productUseCase = ProductUseCase.getInstance(productService);
  }

  @Get()
  getAllProducts(@Query() params: FilterProduct): Promise<ProductEntity[]> {
    return this.productUseCase.getAllProducts(params);
  }

  @Get(':productId')
  getOneProduct(@Param('productId') productId: string) {
    return this.productUseCase.getOneProduct(productId);
  }

  @Post()
  createProduct(@Body() product: ProductEntity): Promise<ProductEntity> {
    return this.productUseCase.createProduct(product);
  }

  @Put(':productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() product: ProductEntity,
  ): Promise<ProductEntity> {
    return this.productUseCase.updateProduct(productId, product);
  }

  @Delete(':productId')
  removeProduct(@Param('productId') productId: string): Promise<ProductEntity> {
    return this.productUseCase.removeProduct(productId);
  }
}
