import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class AddItemToCartDto {
  @Field()
  @IsNotEmpty({ message: 'Please provide the Item' })
  @IsString({ message: 'ItemId is invalid' })
  item: string;

  @Field()
  @IsNotEmpty({ message: 'Please provide quantity' })
  @IsNumber({}, { message: 'quantity is not valid' })
  quantity: number;

  @Field()
  @IsNotEmpty({ message: 'Please provide price' })
  @IsNumber({}, { message: 'price is not valid' })
  price: number;

  @Field({ nullable: true }) // Add nullable: true to make user optional
  @IsOptional()
  user?: string;

  @Field()
  @IsNotEmpty({ message: 'Please provide seller' })
  @IsString({ message: 'Seller is not valid' })
  seller: string;
}

@InputType()
export class RemoveItemFromCartDto {
  @Field()
  @IsNotEmpty({ message: 'Please provide the Item' })
  @IsString({ message: 'ItemId is invalid' })
  item: string;

  @Field({ nullable: true }) // Add nullable: true to make user optional
  @IsOptional()
  user?: string;
}

@InputType()
export class WishlistItemDto {
  @Field()
  @IsNotEmpty({ message: 'Please provide the Item' })
  @IsString({ message: 'ItemId is invalid' })
  listingId: string;

  @Field({ nullable: true }) // Add nullable: true to make user optional
  @IsOptional()
  user?: string;
}

@InputType()
export class UpdateItemQuantityDto {
  @Field()
  @IsNotEmpty({ message: 'Please provide the Item' })
  @IsString({ message: 'ItemId is invalid' })
  itemId: string;

  @Field({ nullable: true }) // Add nullable: true to make user optional
  @IsOptional()
  user?: string;

  @Field({ nullable: true }) // Add nullable: true to make user optional
  @IsOptional()
  quantity?: number;
}

@InputType()
export class FetchCartDto {
  @Field()
  @IsString()
  user: string;
  // Add any necessary fields for fetching the cart
}

@InputType()
export class CreateCartDto {
  @Field()
  user: string;
}
