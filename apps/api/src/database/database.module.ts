import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';
// import { SequelizeModule } from '@nestjs/sequelize';
import { MONGOOSE } from '@api/common/constants/common';
// import { SeedsModule } from './seeds/seeds.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDBProvider } from './providers/mongodb.provider';
import { MongoDBConfig } from './mongodb.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MigrationModule } from './migrations/migration.module';

const URI = 'mongodb://localhost:27017/api';
@Module({
  imports: [
    // SequelizeModule.forRootAsync(databaseProviders[SEQUELIZE]),
    // MongooseModule.forRoot(MongoDBConfig.development.uri),
    MigrationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: URI,
      }),
    }),
    // SeedsModule,
  ],
})
export class DatabaseModule {}
