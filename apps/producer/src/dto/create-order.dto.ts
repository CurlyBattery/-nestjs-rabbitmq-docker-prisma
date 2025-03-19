import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
