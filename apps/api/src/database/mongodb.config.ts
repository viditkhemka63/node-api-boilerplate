import * as dotenv from 'dotenv';
import { IMongodbConfig } from './interface/dbConfig.interface';

dotenv.config();

export const MongoDBConfig: IMongodbConfig = {
  development: {
    uri: process.env.DB_URI,
  },

  test: {
    uri: process.env.DB_URI_TEST,
  },

  production: {
    uri: process.env.DB_URI_PROD,
  },
};
