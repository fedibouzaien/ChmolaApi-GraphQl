import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LocationInput {
  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@InputType()
class AddressInput {
  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  street: string;

  @Field()
  zipCode: number;
}

@InputType()
export class KitchenAddInput {
  @Field()
  public name: string;

  @Field()
  public location: LocationInput;

  @Field()
  public status: boolean;

  @Field()
  public address: AddressInput;
}