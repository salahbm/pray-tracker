import { Environment } from './app.config';

export type AppConfig = {
  nodeEnv: `${Environment}`;
  name: string;
  url: string;
  port: number;
  fallbackLanguage: string;
  corsOrigin: string[];
};
