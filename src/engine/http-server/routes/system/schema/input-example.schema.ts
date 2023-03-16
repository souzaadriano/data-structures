import { IsOptional, IsNumber, Length, IsNotEmpty } from 'class-validator';

export class InputExampleSchema {
  @Length(3)
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsOptional()
  value: number
}