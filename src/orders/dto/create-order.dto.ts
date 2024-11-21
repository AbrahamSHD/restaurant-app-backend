import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tableId: string;
}
