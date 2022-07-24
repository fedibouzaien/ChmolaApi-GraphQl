import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { RootResolver } from './root.resolver';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigLoader } from 'config';
import { KitchenModule } from './kitchen/kitchen.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: ConfigLoader.load(),
    cache: true,
    envFilePath: ['.env.dist', '.env'],
  }),
  CqrsModule,
  GraphQLModule.forRootAsync({
    driver: ApolloDriver,
    useFactory: (config: ConfigService) => {
      return config.get<Omit<GqlModuleOptions, 'driver'>>('graphql');
    },
    inject: [ConfigService],
  }),
  MongooseModule.forRootAsync({
    useFactory: (config: ConfigService) => {
      return config.get<MongooseModuleOptions>('mongoose');
    },
    inject: [ConfigService],
  }),

  KitchenModule,
],
  providers: [RootResolver],
})
export class AppModule {}
