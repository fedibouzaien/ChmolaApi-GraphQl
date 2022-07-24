import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { KitchenAddCommand } from 'src/kitchen/commands';
import { KitchenAddInput } from '../inputs/kitchen.add.input';

@Resolver()
export class KitchenResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => String)
  kitchenAdd(@Args('KitchenAddInput') kitchenAddInput: KitchenAddInput) {
    return this.commandBus.execute(
      plainToInstance(KitchenAddCommand, kitchenAddInput),
    );
  }
}