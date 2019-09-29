import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { OptionsModule } from '../options.module';
import { OptionsService } from '../options.service';

import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../../../config';

import mongoose from 'mongoose';
import { GraphQLModule } from '@nestjs/graphql';

describe('options', () => {
  let app: INestApplication;

  describe('success', () => {
    const optionsService = {
      getOptions() {
        return { username: 'jkchao', password: '123456' };
      },
      updateOptions() {
        return { username: 'jkchao' };
      }
    };

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [
          MongooseModule.forRoot(config.MONGO_URL),
          OptionsModule,
          GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            path: '/api/v2'
          })
        ]
      })
        .overrideProvider(OptionsService)
        .useValue(optionsService)
        .compile();

      app = await module.createNestApplication().init();
    });

    it('getOptions should success', () => {
      return request(app.getHttpServer())
        .post('/api/v2')
        .send({
          query: `
            {
              getOptions {
                url
              }
            }
        `
        })
        .expect(200);
    });

    it('updateUserInfo success', () => {
      return request(app.getHttpServer())
        .post('/api/v2')
        .send({
          query: `
          mutation Options {
            updateOptions(optionsInfo: {_id: "59ef13f0a3ad094f5d294da3"}) {
              url
            }
          }
          `
        })
        .expect(200);
    });

    afterAll(async () => {
      await app.close();
      await mongoose.disconnect();
    });
  });
});
