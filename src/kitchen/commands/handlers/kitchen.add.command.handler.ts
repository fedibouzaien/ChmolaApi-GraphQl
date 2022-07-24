import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { KitchenAddedEvent } from '../../events';
import { KitchenModel } from '../../models';
import { KitchenRepository } from '../../repositories';
import { KitchenAddCommand } from '../kitchen.add.command';
import * as validator from 'class-validator';
import { InvalidArgumentKitchenAddCommandException } from 'src/kitchen/exceptions';
import { IdGenerator } from 'src/common/generators';

@CommandHandler(KitchenAddCommand)
export class KitchenAddCommandHandler
  implements ICommandHandler<KitchenAddCommand>
{
  constructor(
    private readonly repository: KitchenRepository,
    private readonly eventBus: EventBus,
    private readonly idGenerateor: IdGenerator,
  ) {}

  execute(command: KitchenAddCommand): Promise<any> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentKitchenAddCommandException(errors);
    }

    const kitchen = new KitchenModel(this.idGenerateor.generate());
    kitchen.add(command);

    return this.repository.store(kitchen).then(() => {
      this.eventBus.publish(new KitchenAddedEvent(kitchen));

      return kitchen.uuid;
    });
  }
}