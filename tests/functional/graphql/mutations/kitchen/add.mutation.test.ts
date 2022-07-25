import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { Connection, Model } from 'mongoose';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import {
  KitchenDocument,
  KitchenSchemaName,
} from '../../../../../src/kitchen/schemas';
import { UuidGenerator } from '../../../../../src/common/generators';

describe('[graphql] [mutation] kitchen add', () => {
  let app: INestApplication;
  const uuidExcept = uuid();
  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UuidGenerator)
      .useValue({ generate: jest.fn().mockReturnValue(uuidExcept) })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (!app) {
      return;
    }

    await app.get<Connection>(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it('kitchen add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          mutation($input: KitchenAddInput!) {
            kitchenAdd(KitchenAddInput: $input)
          }
        `),
        ),
        variables: {
          input: {
            name: 'cuisine de Sousse',
            location: {
              latitude: 35.853741,
              longitude: 10.59206,
            },
            status: false,
            address: {
              city: 'Sousse',
              country: 'Tunisie',
              street: 'Rue Farhet Hached',
              zipCode: 4070,
            },
          },
        },
      })
      .then(async (response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ kitchenAdd: uuidExcept });

        const kitchen = await app
          .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
          .findOne({ uuid: uuidExcept })
          .exec();

        expect(kitchen).not.toEqual(null);
        expect(kitchen.name).toEqual('cuisine de Sousse');
        expect(kitchen.location.coordinates).toEqual([35.853741, 10.59206]);
        expect(kitchen.status).toEqual(false);
        expect(kitchen.address.city).toEqual('Sousse');
        expect(kitchen.address.country).toEqual('Tunisie');
        expect(kitchen.address.street).toEqual('Rue Farhet Hached');
        expect(kitchen.address.zipCode).toEqual(4070);
      });
  });
});