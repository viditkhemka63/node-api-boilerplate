import { MONGOOSE } from './../../common/constants/common';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../database.config';
import {
  APPLICATION_NAME,
  DEVELOPMENT,
  PRODUCTION,
  SEQUELIZE,
  TEST,
} from '@api/common/constants/common';
import { createNamespace } from 'cls-hooked';
import { mongoDBProvider } from './mongodb.provider';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { SequilizeModels } from './models';

export const databaseProviders = {
  [SEQUELIZE]: (): Partial<SequelizeModuleOptions> => {
    (Sequelize as any).__proto__.useCLS(createNamespace('api-transactions'));
    let config;
    switch (process.env.NODE_ENV) {
      case DEVELOPMENT:
        config = databaseConfig.development;
        break;
      case TEST:
        config = databaseConfig.test;
        break;
      case PRODUCTION:
        config = databaseConfig.production;
        break;
      default:
        config = databaseConfig.development;
        break;
    }

    return {
      dialect: 'postgres',
      name: APPLICATION_NAME,
      host: config.host || '127.0.0.1',
      port: config.port || 5432,
      username: config.username || 'postgres',
      password: config.password,
      database: config.database || 'bizisell',
      models: SequilizeModels,
      autoLoadModels: true,
      // timestamps: true,
      // paranoid: true,
      logging: false,
    };
  },

  [MONGOOSE]: (): string => {
    return mongoDBProvider();
  },
};
