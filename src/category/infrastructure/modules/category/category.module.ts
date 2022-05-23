import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryUseCase } from 'src/category/application/use-cases/category.usecase';
import { CategoryController } from 'src/category/infrastructure/controller/category/category.controller';
import {
  Category,
  CategorySchema,
} from 'src/category/infrastructure/schemas/category.schema';
import { CategoryService } from 'src/category/infrastructure/services/category/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryUseCase],
})
export class CategoryModule {}
