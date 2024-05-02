import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Cart {
  @Field()
  id: string;

  @Field()
  user: string;

  @Field()
  totalAmount?: number;

  @Field()
  totalItem?: number;

  @Field(() => [Items]) // Define items as an array of Items
  items?: Items[];
}

@ObjectType()
export class Items {
  @Field()
  id: string;

  @Field()
  seller: string;

  @Field()
  listingId: string;

  @Field()
  quantity: number;

  @Field()
  price: number; // Use lowercase "number"
}

@ObjectType()
export class Address {
  @Field()
  lane1: string;

  @Field()
  lane2: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  pincode: string;
}

@ObjectType()
export class ErrorType {
  @Field()
  message: string;

  @Field({ nullable: true })
  code?: string;
}

@ObjectType()
export class OrderResponse {
  @Field()
  id: string;

  @Field()
  address: Address;

  @Field()
  user: string;

  @Field()
  status: string;

  @Field()
  totalAmount: number;

  @Field()
  totalItem: number;

  @Field(() => [Items]) // Define items as an array of Items
  items: Items[];
}

@ObjectType()
export class CartSettings {
  @Field()
  value : Number;
}
