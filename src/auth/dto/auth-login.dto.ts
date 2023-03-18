import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
@ApiProperty({ example: 'karki22mahesh@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin@123' })
  @IsNotEmpty()
  password: string;
}