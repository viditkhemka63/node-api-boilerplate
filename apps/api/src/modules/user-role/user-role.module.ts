import { Module } from '@nestjs/common';
import { UserRoleService } from './services/user-role.service';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRoleRepository } from './services/user-role.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserRoleDatabaseName,
  UserRoleEntity,
  UserRoleSchema,
} from './schemas/user-role.schema';
import {
  USER_ROLE_SERVICE,
  USER_ROLE_BULK_SERVICE,
} from '@api/modules/user-role/common/constants/user-role.list.constant';
import { UserRoleBulkService } from './services/user-role.bulk.service';
import { UserRoleBulkRepository } from './services/user-role.bulk.repository';

@Module({
  providers: [
    UserRoleRepository,
    UserRoleBulkRepository,
    {
      provide: USER_ROLE_SERVICE,
      useClass: UserRoleService,
    },
    {
      provide: USER_ROLE_BULK_SERVICE,
      useClass: UserRoleBulkService,
    },
  ],
  exports: [
    {
      provide: USER_ROLE_SERVICE,
      useClass: UserRoleService,
    },
    {
      provide: USER_ROLE_BULK_SERVICE,
      useClass: UserRoleBulkService,
    },
  ],
  controllers: [UserRoleController],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserRoleEntity.name,
        schema: UserRoleSchema,
        collection: UserRoleDatabaseName,
      },
    ]),
  ],
})
export class UserRoleModule {}
