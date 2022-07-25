import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { KitchenAddCommand } from 'src/kitchen/commands';
import { KitchenAddInput } from '../inputs/kitchen.add.input';
import { KitchenUpdateCommand } from 'src/kitchen/commands/kitchen.update.command';
import { KitchenUpdateInput } from '../inputs/kitchen.update.input';

@Resolver()
export class KitchenResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => String)
  kitchenAdd(@Args(KitchenAddInput.name) kitchenAddInput: KitchenAddInput) {
    return this.commandBus.execute(
      plainToInstance(KitchenAddCommand, kitchenAddInput),
    );
  }

  @Mutation(() => String)
  kitchenUpdate(
    @Args(KitchenUpdateInput.name) kitchenUpdateInput: KitchenUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(KitchenUpdateCommand, kitchenUpdateInput),
    );
  }
}
