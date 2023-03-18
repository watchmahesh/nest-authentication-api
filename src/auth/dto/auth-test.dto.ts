import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginTestDto {

  @ApiProperty({ example: 'admin@123' })
  @IsNotEmpty()
  token: string;
}