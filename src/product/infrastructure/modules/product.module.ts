import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductUseCase } from 'src/product/application/use-cases/product.usecase';
import { ProductController } from 'src/product/infrastructure/controllers/product/product.controller';
import {
  Product,
  ProductSchema,
} from 'src/product/infrastructure/schemas/product.schema';
import { ProductService } from 'src/product/infrastructure/services/product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductUseCase],
})
export class ProductModule {}
