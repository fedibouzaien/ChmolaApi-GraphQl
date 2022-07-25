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
import { IdGenerator } from 'src/common/generators';

describe('[graphql] [mutation] kitchen update', () => {
  let app: INestApplication;
  const uuidExcept = uuid();
  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IdGenerator
        )
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

  it('Update all fields of kitchen', () => {
    return app
      .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Kitchen',
        location: {
          coordinates: [35.853741, 10.59206],
        },
        status: false,
        address: {
          city: 'Sousse',
          country: 'Tunisie',
          street: 'Rue Farhet Hached',
          zipCode: 4070,
        },
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`mutation($input: KitchenUpdateInput!) {
            kitchenUpdate(KitchenUpdateInput: $input)
          }
        `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Kitchen Updated',
                location: {
                  latitude: 40.853785,
                  longitude: -6.56975,
                },
                status: false,
                address: {
                  city: 'Sousse Updated',
                  country: 'Tunisie Updated',
                  street: 'Rue Farhet Hached updated',
                  zipCode: 4099,
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ kitchenUpdate: uuidExcept });

        return app
          .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
          .findOne({ uuid: uuidExcept })
          .exec()
          .then((kitchen) => {
            expect(kitchen).not.toEqual(null);
            expect(kitchen.name).toEqual('Kitchen Updated');
            expect(kitchen.location.coordinates[0]).toEqual(40.853785);
            expect(kitchen.location.coordinates[1]).toEqual(-6.56975);
            expect(kitchen.status).toEqual(false);
            expect(kitchen.address.city).toEqual('Sousse Updated');
            expect(kitchen.address.country).toEqual('Tunisie Updated');
            expect(kitchen.address.street).toEqual('Rue Farhet Hached updated');
            expect(kitchen.address.zipCode).toEqual(4099);
          });
      });
  });

  it('update name of kitchen', () => {
    return app
      .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'cuisine de sousse',
        location: {
          coordinates: [35.853741, 10.59206],
        },
        status: false,
        address: {
          city: 'Sousse',
          country: 'Tunisie',
          street: 'Rue Farhet Hached',
          zipCode: 4070,
        },
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: KitchenUpdateInput!) {
                  kitchenUpdate(KitchenUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'updated name',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ kitchenUpdate: uuidExcept });

        return app
          .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((kitchen) => {
            expect(kitchen).not.toEqual(null);
            expect(kitchen.name).toEqual('updated name');
            expect(kitchen.location.coordinates).toEqual([35.853741, 10.59206]);
            expect(kitchen.status).toEqual(false);
            expect(kitchen.address.city).toEqual('Sousse');
            expect(kitchen.address.country).toEqual('Tunisie');
            expect(kitchen.address.street).toEqual('Rue Farhet Hached');
            expect(kitchen.address.zipCode).toEqual(4070);
          });
      });
  });

  it('update status of kitchen', () => {
    return app
      .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Name',
        location: {
          coordinates: [35.853741, 10.59206],
        },
        status: false,
        address: {
          city: 'Sousse',
          country: 'Tunisie',
          street: 'Rue Farhet Hached',
          zipCode: 4070,
        },
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: KitchenUpdateInput!) {
                  kitchenUpdate(KitchenUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                status: true,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ kitchenUpdate: uuidExcept });

        return app
          .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((kitchen) => {
            expect(kitchen).not.toEqual(null);
            expect(kitchen.name).toEqual('Name');
            expect(kitchen.location.coordinates).toEqual([35.853741, 10.59206]);
            expect(kitchen.status).toEqual(true);
            expect(kitchen.address.city).toEqual('Sousse');
            expect(kitchen.address.country).toEqual('Tunisie');
            expect(kitchen.address.street).toEqual('Rue Farhet Hached');
            expect(kitchen.address.zipCode).toEqual(4070);
          });
      });
  });

  it('update address of kitchen', async () => {
    return app
      .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Name',
        location: {
          coordinates: [35.853741, 10.59206],
        },
        status: false,
        address: {
          city: 'Sousse',
          country: 'Tunisie',
          street: 'Rue Farhet Hached',
          zipCode: 4070,
        },
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: KitchenUpdateInput!) {
                  kitchenUpdate(KitchenUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                address: {
                  city: 'Sousse updated',
                  country: 'Tunisie updated',
                  street: 'Rue Farhet Hached updated',
                  zipCode: 4099,
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ kitchenUpdate: uuidExcept });

        return app
          .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((kitchen) => {
            expect(kitchen).not.toEqual(null);
            expect(kitchen.name).toEqual('Name');
            expect(kitchen.location.coordinates).toEqual([35.853741, 10.59206]);
            expect(kitchen.status).toEqual(false);
            expect(kitchen.address.city).toEqual('Sousse updated');
            expect(kitchen.address.country).toEqual('Tunisie updated');
            expect(kitchen.address.street).toEqual('Rue Farhet Hached updated');
            expect(kitchen.address.zipCode).toEqual(4099);
          });
      });
  });

  it('update location of kitchen', () => {
    return app
      .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Name',
        location: {
          coordinates: [35.853741, 10.59206],
        },
        status: false,
        address: {
          city: 'Sousse',
          country: 'Tunisie',
          street: 'Rue Farhet Hached',
          zipCode: 4070,
        },
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: KitchenUpdateInput!) {
                  kitchenUpdate(KitchenUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                location: {
                  latitude: 40.741853,
                  longitude: 11.06592,
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ kitchenUpdate: uuidExcept });

        return app
          .get<Model<KitchenDocument>>(getModelToken(KitchenSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((kitchen) => {
            expect(kitchen).not.toEqual(null);
            expect(kitchen.name).toEqual('Name');
            expect(kitchen.location.coordinates).toEqual([40.741853, 11.06592]);
            expect(kitchen.status).toEqual(false);
            expect(kitchen.address.city).toEqual('Sousse');
            expect(kitchen.address.country).toEqual('Tunisie');
            expect(kitchen.address.street).toEqual('Rue Farhet Hached');
            expect(kitchen.address.zipCode).toEqual(4070);
          });
      });
  });
});