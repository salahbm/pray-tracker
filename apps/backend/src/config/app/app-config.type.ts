import { Environment } from './app.config';

export type AppConfig = {
  nodeEnv: `${Environment}`;
  name: string;
  url: string;
  port: number;
  debug: boolean;
  fallbackLanguage: string;
  appLogging: boolean;
  logLevel: string;
  logService: string;
  corsOrigin: boolean | string[] | '*';
};
