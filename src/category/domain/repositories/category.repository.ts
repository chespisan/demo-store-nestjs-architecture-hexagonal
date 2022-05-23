import { CategoryEntity } from 'src/category/domain/entities/category.entity';

export interface CategoryRepository {
  getAllCategories(): Promise<CategoryEntity[]>;
  getOneCategory(categoryId: string | number): Promise<CategoryEntity>;
  createCategory(category: CategoryEntity): Promise<CategoryEntity>;
  updateCategory(
    categoryId: string | number,
    category: CategoryEntity,
  ): Promise<CategoryEntity>;
  removeCategory(categoryId: string | number): Promise<CategoryEntity>;
  removeProductToCategory(
    categoryId: string,
    productId: string,
  ): Promise<CategoryEntity>;
  addProductsToCategory(
    categoryId: string,
    productIds: any,
  ): Promise<CategoryEntity>;
}
