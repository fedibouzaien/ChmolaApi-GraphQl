import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { IdGenerator } from 'src/common/generators';
import { commandsHandlers } from './commands';
import { KitchenResolver } from './graphql/resolvers/kitchen.resolver';
import { repositories } from './repositories';
import { schemasDefinitions } from './schemas';

@Module({
  imports: [CqrsModule, MongooseModule.forFeature(schemasDefinitions)],
  providers: [
    ...commandsHandlers,
    ...repositories,
    KitchenResolver,
    IdGenerator,
  ],
})
export class KitchenModule {}