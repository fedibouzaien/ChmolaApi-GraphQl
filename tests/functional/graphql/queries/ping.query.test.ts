import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { AppModule } from '../../../../src/app.module';

describe('[graphql] [query] ping', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('ping', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          query {
            ping
          }
        `),
        ),
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ ping: 'pong' });
      });
  });
});