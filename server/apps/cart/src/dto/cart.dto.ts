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
export class AddItemToWishlistDto {
  @Field()
  @IsNotEmpty({ message: 'Please provide the Item' })
  @IsString({ message: 'ItemId is invalid' })
  item: string;

  @Field()
  @IsNotEmpty({ message: 'Please provide the listingId' })
  @IsString({ message: 'listingId is invalid' })
  listingId: string;

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
}

@InputType()
export class FetchWishlistDto {
  @Field()
  @IsString()
  user: string;
}

@InputType()
export class CreateCartDto {
  @Field()
  user: string;
}

@InputType()
export class AddressDto {
  @Field({ nullable: true }) // Optional for creation
  @IsOptional()
  @IsString()
  id?: string;

  // @Field()
  // @IsString()
  // lane1: string;

  @Field()
  @IsString()
  street: string;

  @Field()
  @IsString()
  city: string;

  @Field()
  @IsString()
  state: string;

  @Field()
  @IsString()
  pincode: string;

  @Field({defaultValue: false})
  @IsString()
  @IsOptional()
  defaultAddress?: boolean;

  @Field()
  @IsString()
  saveAs: string;
}

@InputType()
export class AddressUpdateDto extends AddressDto {
  @Field()
  @IsString()
  id: string;  // Needed for updating specific address
}