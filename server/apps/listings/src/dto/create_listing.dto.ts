import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, Min, Max, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateListingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;  // Change from category name to category ID
  
  @IsOptional()  // Also optional, will be defined only if categoryLabel is used
  @IsString()
  categoryLabel?: string;

  @IsOptional()
  @IsUUID()
  subCategoryId?: string;  // Change from subCategory name to subCategory ID

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];
  
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsNotEmpty()
  @IsString()
  delivery: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubCategoryDto)
  subCategories?: CreateSubCategoryDto[];  // Optional array of subcategories
}
export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;  // This field might not be necessary when creating subcategories directly within a category creation DTO

}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubCategoryDto)
  subCategories?: UpdateSubCategoryDto[];
}

export class UpdateSubCategoryDto {
  @IsString()
  id: string;  // Needed for identifying subcategories for updates

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description?: string;
}