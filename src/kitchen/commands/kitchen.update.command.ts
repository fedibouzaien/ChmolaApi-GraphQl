
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Address {
  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  street: string;

  @IsNumber()
  zipCode: number;
}

class Location {
  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}

export class KitchenUpdateCommand {
    @IsNotEmpty()
    public readonly uuid: string;
  
    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    public readonly name: string;
  
    @IsOptional()
    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(() => Location)
    public readonly location: Location;
  
    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    public readonly status: boolean;
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Address)
    @IsNotEmpty()
    public readonly address: Address;
  }