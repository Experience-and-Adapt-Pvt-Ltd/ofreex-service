import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Name is Required' })
  @IsString({ message: 'Name just need to be one string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Enter Email Please' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Enter Password' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Enter Phone Number' })
  phoneNumber: number;

  @Field()
  @IsNotEmpty({ message: 'Enter Premium status pls' })
  isPremium: boolean;
}

@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: 'Activation Token is required!' })
  activationToken: string;

  @Field()
  @IsNotEmpty({ message: 'Activation Code is required!' })
  activationCode: string;
}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Enter Email' })
  @IsEmail({}, { message: 'Email is Invalid' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Enter Password' })
  password: string;
}


@InputType()
export class ForgotPasswordDto {
  @Field()
  @IsNotEmpty({ message: 'Enter Email' })
  @IsEmail({}, { message: 'Email is Invalid' })
  email: string;
}

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsNotEmpty({ message: 'New Password Required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @Field()
  @IsNotEmpty({ message: "Activation Token is Required" })
  activationToken: string
}