import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
