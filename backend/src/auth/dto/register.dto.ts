import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nickname: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone: string;
}
