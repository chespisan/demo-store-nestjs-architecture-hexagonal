import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}
