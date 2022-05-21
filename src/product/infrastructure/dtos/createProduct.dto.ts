import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsUrl()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
}
