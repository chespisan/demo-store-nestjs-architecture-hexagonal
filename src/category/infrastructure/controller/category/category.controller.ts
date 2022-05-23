import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryUseCase } from 'src/category/application/use-cases/category.usecase';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import { CategoryService } from 'src/category/infrastructure/services/category/category.service';
import { AddProductsDto } from '../../dtos/addProducts.dto';

@Controller('categories')
export class CategoryController implements CategoryRepository {
  constructor(
    private readonly categoryUseCase: CategoryUseCase,
    private readonly categoryService: CategoryService,
  ) {
    this.categoryUseCase = CategoryUseCase.getInstance(categoryService);
  }

  @Get()
  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryUseCase.getAllCategories();
  }

  @Get(':categoryId')
  getOneCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<CategoryEntity> {
    return this.categoryUseCase.getOneCategory(categoryId);
  }

  @Post()
  createCategory(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryUseCase.createCategory(category);
  }

  @Put(':categoryId')
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() category: CategoryEntity,
  ): Promise<CategoryEntity> {
    return this.categoryUseCase.updateCategory(categoryId, category);
  }

  @Delete(':categoryId')
  removeCategory(
    @Param('categoryId') categoryId: string | number,
  ): Promise<CategoryEntity> {
    return this.categoryUseCase.removeCategory(categoryId);
  }

  @Delete(':categoryId/product/:productId')
  removeProductToCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ): Promise<CategoryEntity> {
    return this.categoryUseCase.removeProductToCategory(categoryId, productId);
  }

  @Put(':categoryId/products')
  addProductsToCategory(
    @Param('categoryId') categoryId: string,
    @Body() productIds: AddProductsDto,
  ): Promise<CategoryEntity> {
    return this.categoryUseCase.addProductsToCategory(
      categoryId,
      productIds.productsId,
    );
  }
}
