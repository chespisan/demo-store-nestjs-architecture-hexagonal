import { CategoryEntity } from 'src/category/domain/entities/category.entity';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';

export class CategoryUseCase implements CategoryRepository {
  private static _instance: CategoryUseCase;

  constructor(private readonly categoryRepository: CategoryRepository) {}

  public static getInstance(
    categoryRepository: CategoryRepository,
  ): CategoryUseCase {
    if (!this._instance) this._instance = new this(categoryRepository);
    return this._instance;
  }

  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.getAllCategories();
  }

  getOneCategory(categoryId: string | number): Promise<CategoryEntity> {
    return this.categoryRepository.getOneCategory(categoryId);
  }

  createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryRepository.createCategory(category);
  }

  updateCategory(
    categoryId: string | number,
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.updateCategory(categoryId, category);
  }

  removeCategory(categoryId: string | number): Promise<CategoryEntity> {
    return this.categoryRepository.removeCategory(categoryId);
  }

  removeProductToCategory(
    categoryId: string,
    productId: string,
  ): Promise<CategoryEntity> {
    return this.categoryRepository.removeProductToCategory(
      categoryId,
      productId,
    );
  }

  addProductsToCategory(
    categoryId: string,
    productIds: string[],
  ): Promise<CategoryEntity> {
    return this.categoryRepository.addProductsToCategory(
      categoryId,
      productIds,
    );
  }
}
