import { Module } from '@nestjs/common';
import { PermissionServiceMongo } from './services/permission.mongo.service';
import { PermissionController } from './controller/permission.controller';
import { PermissionBulkRepository } from './services/permission.bulk.repository';
import { PermissionRepository } from './services/permission.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PermissionDatabaseName,
  PermissionEntity,
  PermissionSchema,
} from './models/permission.schema';
import { PermissionBulkService } from './services/permission.bulk.mongo.service';
import {
  PERMISSION_BULK_SERVICE,
  PERMISSION_SERVICE,
} from './common/constants/permission.list.constant';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel } from './models/permission.model';
import { PermissionSqlService } from './services/permission.sql.service';
import * as dotenv from 'dotenv';
import { MONGOOSE, SEQUELIZE } from '@api/common/constants/common';

dotenv.config();

const DB_LAYER: string = process.env.DB_LAYER;

const serviceMapping = {
  [SEQUELIZE]: PermissionSqlService,
  [MONGOOSE]: PermissionServiceMongo,
};

@Module({
  providers: [
    PermissionRepository,
    PermissionBulkRepository,
    {
      provide: PERMISSION_SERVICE,
      useClass: serviceMapping[DB_LAYER],
    },
    {
      provide: PERMISSION_BULK_SERVICE,
      useClass: PermissionBulkService,
    },
  ],
  exports: [
    {
      provide: PERMISSION_SERVICE,
      useClass: serviceMapping[DB_LAYER],
    },
    {
      provide: PERMISSION_BULK_SERVICE,
      useClass: PermissionBulkService,
    },
  ],
  controllers: [PermissionController],
  imports: [
    MongooseModule.forFeature([
      {
        name: PermissionEntity.name,
        schema: PermissionSchema,
        collection: PermissionDatabaseName,
      },
    ]),
    SequelizeModule.forFeature([PermissionModel]),
  ],
})
export class PermissionModule {}
