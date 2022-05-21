import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ParamsEntity,
  ProductEntity,
} from 'src/product/domain/entities/product.entity';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';
import { CreateProductDto } from 'src/product/infrastructure/dtos/createProduct.dto';
import { UpdateProductDto } from 'src/product/infrastructure/dtos/updateProduct.dto';
import { Product } from 'src/product/infrastructure/schemas/product.schema';
import { MongoIdPipe } from 'src/shared/pipes/mongo-id.pipe';

@Injectable()
export class ProductService implements ProductRepository {
  private static _instance: ProductService;
  @InjectModel(Product.name) private productModel: Model<Product>;

  private mongoPipe: MongoIdPipe;

  constructor() {
    this.mongoPipe = new MongoIdPipe();
  }

  public static getInstance(): ProductService {
    if (!this._instance) this._instance = new this();
    return this._instance;
  }

  async getAllProducts(params: ParamsEntity): Promise<ProductEntity[]> {
    if (params) {
      const { offset, limit } = params;
      const listProducts = await this.productModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();
      return listProducts;
    }
    const listProducts = await this.productModel.find().exec();
    return listProducts;
  }

  async getOneProduct(productId: string): Promise<ProductEntity> {
    this.mongoPipe.transform(productId);
    try {
      const product = await this.productModel.findById(productId).exec();
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }

  async createProduct(product: CreateProductDto): Promise<ProductEntity> {
    try {
      const newProduct = new this.productModel(product);
      return newProduct.save();
    } catch (error) {
      throw new BadRequestException(`Product not save`);
    }
  }

  async updateProduct(
    productId: string,
    productChanges: UpdateProductDto,
  ): Promise<ProductEntity> {
    try {
      const product = this.productModel
        .findByIdAndUpdate(
          productId,
          {
            $set: productChanges,
          },
          { new: true },
        )
        .exec();
      return product;
    } catch (error) {
      throw new BadRequestException(`Product not update`);
    }
  }

  async removeProduct(productId: string): Promise<ProductEntity> {
    try {
      return this.productModel.findByIdAndDelete(productId);
    } catch (error) {
      throw new NotFoundException(`Product not remove`);
    }
  }
}
