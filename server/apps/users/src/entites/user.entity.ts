import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"id")')
export class Avatars {
  @Field()
  id: string;

  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  userID: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Avatars, { nullable: true })
  avatars?: Avatars | null;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phone_number: number;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
