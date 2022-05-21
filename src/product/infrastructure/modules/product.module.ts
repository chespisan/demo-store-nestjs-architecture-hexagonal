import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductUseCase } from 'src/product/application/use-cases/product.usecase';
import { ProductController } from '../controllers/product/product.controller';
import { Product, ProductSchema } from '../schemas/product.schema';
import { ProductService } from '../services/product/product.service';

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
