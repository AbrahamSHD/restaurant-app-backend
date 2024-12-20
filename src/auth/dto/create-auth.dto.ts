import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsOptional()
  @IsUUID()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(14)
  password: string;

  @IsOptional()
  @IsString()
  roleId: string;

  @IsOptional()
  @IsString()
  membershipId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  reservations: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  orders: string[];
}
