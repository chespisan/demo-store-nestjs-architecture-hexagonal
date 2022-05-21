import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterProduct {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
