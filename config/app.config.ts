import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    env: process.env.APP_ENV,
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    version: process.env.APP_VERSION,
  } as AppConfig;
});

export interface AppConfig {
  env: 'prod' | 'staging' | 'test' | 'local';
  port: number;
  version: string;
}
