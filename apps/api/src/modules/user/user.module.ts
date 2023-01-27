import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './services/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDatabaseName, UserEntity, UserSchema } from './models/user.schema';
import {
  USER_SERVICE,
  USER_BULK_SERVICE,
} from '@api/modules/user/common/constants/user.list.constant';
import { UserBulkRepository } from './services/user.bulk.repository';
import { UserBulkService } from './services/user.bulk.service';

@Module({
  providers: [
    UserRepository,
    UserBulkRepository,
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_BULK_SERVICE,
      useClass: UserBulkService,
    },
  ],
  exports: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_BULK_SERVICE,
      useClass: UserBulkService,
    },
  ],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
        collection: UserDatabaseName,
      },
    ]),
  ],
})
export class UserModule {}
