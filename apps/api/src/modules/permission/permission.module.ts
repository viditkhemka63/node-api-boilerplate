import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controller/permission.controller';
import { PermissionBulkRepository } from './services/permission.bulk.repository';
import { PermissionRepository } from './services/permission.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PermissionDatabaseName,
  PermissionEntity,
  PermissionSchema,
} from './schemas/permission.schema';
import { PermissionBulkService } from './services/permission.bulk.service';
import {
  PERMISSION_BULK_SERVICE,
  PERMISSION_SERVICE,
} from './common/constants/permission.list.constant';

@Module({
  providers: [
    PermissionRepository,
    PermissionBulkRepository,
    {
      provide: PERMISSION_SERVICE,
      useClass: PermissionService,
    },
    {
      provide: PERMISSION_BULK_SERVICE,
      useClass: PermissionBulkService,
    },
  ],
  exports: [
    {
      provide: PERMISSION_SERVICE,
      useClass: PermissionService,
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
  ],
})
export class PermissionModule {}
