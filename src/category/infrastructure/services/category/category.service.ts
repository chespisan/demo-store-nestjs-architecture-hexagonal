import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryEntity } from 'src/category/domain/entities/category.entity';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id.pipe';
import { CreateCategoryDto } from '../../dtos/createCategory.dto';
import { UpdateCategoryDto } from '../../dtos/updateCategory.dto';
import { Category } from '../../schemas/category.schema';

@Injectable()
export class CategoryService implements CategoryRepository {
  private static _instance: CategoryService;
  @InjectModel(Category.name) private categoryModel: Model<Category>;

  private mongoPipe: MongoIdPipe;

  constructor() {
    this.mongoPipe = new MongoIdPipe();
  }

  public static getInstance(): CategoryService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    try {
      const listCategories = await this.categoryModel
        .find()
        .populate('products')
        .exec();
      return listCategories;
    } catch (error) {
      throw new BadRequestException('Category not get');
    }
  }

  async getOneCategory(categoryId: string): Promise<CategoryEntity> {
    this.mongoPipe.transform(categoryId);
    try {
      const category = await this.categoryModel.findById(categoryId).exec();
      return category;
    } catch (error) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  }

  async createCategory(category: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const newCategory = new this.categoryModel(category);
      return newCategory.save();
    } catch (error) {
      throw new BadRequestException(`Category not create`);
    }
  }

  async updateCategory(
    categoryId: string | number,
    categorChanges: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    try {
      const category = await this.categoryModel
        .findByIdAndUpdate(
          categoryId,
          {
            $set: categorChanges,
          },
          {
            new: true,
          },
        )
        .exec();
      return category;
    } catch (error) {
      throw new BadRequestException(`Category not update`);
    }
  }

  async removeCategory(categoryId: string | number): Promise<CategoryEntity> {
    try {
      return this.categoryModel.findByIdAndRemove(categoryId);
    } catch (error) {
      throw new NotFoundException(`Category not remove`);
    }
  }

  async removeProductToCategory(
    categoryId: string,
    productId: string,
  ): Promise<CategoryEntity> {
    try {
      const category = await this.categoryModel.findById(categoryId);
      category.products.pull(productId);
      return category.save();
    } catch (error) {
      throw new NotFoundException(`Product not remove`);
    }
  }

  async addProductsToCategory(
    categoryId: string,
    productIds: string[],
  ): Promise<CategoryEntity> {
    try {
      const category = await this.categoryModel.findById(categoryId);
      productIds.forEach((productId) => category.products.push(productId));
      return category.save();
    } catch (error) {
      throw new BadRequestException(`Not add product`);
    }
  }
}
