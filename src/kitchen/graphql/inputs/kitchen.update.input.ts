import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
class KitchenUpdateLocationInput {
  @Field()
  public readonly latitude: number;

  @Field()
  public readonly longitude: number;
}

@InputType()
class KitchenUpdateAddressInput {
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
export class KitchenUpdateInput {
  @Field()
  @IsNotEmpty()
  public readonly uuid: string;

  @Field({ nullable: true })
  public readonly name?: string;

  @Field({ nullable: true })
  public readonly location?: KitchenUpdateLocationInput;

  @Field({ nullable: true })
  public readonly status?: boolean;

  @Field({ nullable: true })
  public readonly address?: KitchenUpdateAddressInput;
}
