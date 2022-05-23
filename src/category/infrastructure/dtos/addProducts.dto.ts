import { IsArray, IsNotEmpty } from 'class-validator';

export class AddProductsDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsId: string[];
}
