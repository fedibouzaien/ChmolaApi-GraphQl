
import {
    IsBoolean,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class Address {
    @IsNotEmpty()
    @IsString()
    city: string;
  
    @IsNotEmpty()
    @IsString()
    country: string;
  
    @IsNotEmpty()
    @IsString()
    street: string;
  
    @IsNotEmpty()
    @IsNumber()
    zipCode: number;
  }
  
  class Location {
    @IsLatitude()
    latitude: number;
  
    @IsLongitude()
    longitude: number;
  }
  
  export class KitchenAddCommand {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    public readonly name: string;
  
    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(() => Location)
    public readonly location: Location;
  
    @IsNotEmpty()
    @IsBoolean()
    public readonly status: boolean;
  
    @ValidateNested({ each: true })
    @Type(() => Address)
    public readonly address: Address;
  }