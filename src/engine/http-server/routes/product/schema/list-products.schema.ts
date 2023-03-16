import { IsOptional, IsNumber, Length, IsNotEmpty } from 'class-validator';

export class ListProductsSchema {
  @IsNumber()
  quantity: number;
}
