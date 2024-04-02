import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, Min, Max } from 'class-validator';

export class CreateListingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsString()
  subCategory?: string;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsString()
  state?: string;

  @IsArray()
  imageUrls: string[];

  @IsNotEmpty()
  @IsString()
  userId: string;
}
