import { MongoDBConfig } from './../mongodb.config';
export const LOCAL_DB_CONNECTION_STRING = 'mongodb://localhost:27017/ai';
import { DEVELOPMENT, PRODUCTION, TEST } from '@api/common/constants/common';

export const mongoDBProvider = () => {
  switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      return MongoDBConfig.development.uri;

    case TEST:
      return MongoDBConfig.test.uri;

    case PRODUCTION:
      return MongoDBConfig.production.uri;

    default:
      return MongoDBConfig.development;
  }
};
