import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ProductEntity } from 'src/product/domain/entities/product.entity';
import { ProductRepository } from 'src/product/domain/repositories/product.repository';
import { ProductUseCase } from 'src/product/application/use-cases/product.usecase';
import { FilterProduct } from 'src/product/infrastructure/dtos/filterProduct';
import { ProductService } from 'src/product/infrastructure/services/product/product.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard) // agregamos este guard para validar los endpoint por medio de su jwtToken
@Controller('products')
export class ProductController implements ProductRepository {
  constructor(
    private readonly productUseCase: ProductUseCase,
    private readonly productService: ProductService,
  ) {
    this.productUseCase = ProductUseCase.getInstance(productService);
  }

  @Public() // agregamos el decorador que creamos para indicar que este recurso no requiere del token para ser expuesto
  @Get()
  getAllProducts(@Query() params: FilterProduct): Promise<ProductEntity[]> {
    return this.productUseCase.getAllProducts(params);
  }

  @Roles(RoleEnum.ADMIN) // Agregamos el decorador de roles para validar qen este caso que el unico user con role de admin pueda acceder a este recurso
  @Get(':productId')
  getOneProduct(@Param('productId') productId: string) {
    return this.productUseCase.getOneProduct(productId);
  }

  // @Roles(RoleEnum.ADMIN)
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
