import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { KitchenUpdateCommand } from '../kitchen.update.command';
import * as validator from 'class-validator';
import { KitchenRepository } from '../../repositories';
import { InvalidArgumentKitchenUpdateCommandException } from '../../exceptions/invalid.argument.kitchen.update.command.exception';
import { KitchenUpdatedEvent } from '../../events';

@CommandHandler(KitchenUpdateCommand)
export class KitchenUpdateCommandHandler
  implements ICommandHandler<KitchenUpdateCommand>
{
  constructor(
    private readonly repository: KitchenRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: KitchenUpdateCommand): Promise<any> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentKitchenUpdateCommandException(errors);
    }

    const kitchen = await this.repository.findOneByUuid(command.uuid);

    if (!kitchen) {
      throw new Error(`kitchen not found with this uuid :${command.uuid}`);
    }

    kitchen.update(command);

    return this.repository.update(kitchen).then(() => {
      this.eventBus.publish(new KitchenUpdatedEvent(kitchen));

      return command.uuid;
    });
  }
}
