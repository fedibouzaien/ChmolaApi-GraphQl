import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KitchenAddLocationInput {
  @Field()
  public readonly latitude: number;

  @Field()
  public readonly longitude: number;
}

@InputType()
export class KitchenAddAddressInput {
  @Field()
  public readonly city: string;

  @Field()
  public readonly country: string;

  @Field()
  public readonly street: string;

  @Field()
  public readonly zipCode: number;
}

@InputType()
export class KitchenAddInput {
  @Field()
  public readonly name: string;

  @Field()
  public readonly location: KitchenAddLocationInput;

  @Field()
  public readonly status: boolean;

  @Field()
  public readonly address: KitchenAddAddressInput;
}
