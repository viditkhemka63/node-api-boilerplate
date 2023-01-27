import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { MONGOOSE, SEQUELIZE } from '@api/common/constants/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationModule } from './migrations/migration.module';

const URI = 'mongodb://localhost:27017/saas';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => {
        return databaseProviders[SEQUELIZE]();
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: URI,
      }),
    }),
    MigrationModule,
  ],
})
export class DatabaseModule {}
