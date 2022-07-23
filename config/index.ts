import { registerAs } from '@nestjs/config';
import app from './app.config';
import mongoose from './modules/mongoose.config';
import graphql from './modules/graphql.config';

export class ConfigLoader {
  static load() {
    return [
      registerAs('app', () => {
        return app;
      }),
      registerAs('mongoose', () => {
        return { ...mongoose() };
      }),
      registerAs('graphql', () => {
        return { ...graphql() };
      }),
    ];
  }
}