import { IDatabaseBulkRepositoryAbstract } from '@api/common/interfaces/database.bulk.repository.interface';
import { DatabaseMongoBulkRepositoryAbstract } from '@api/database/abstracts/database.mongo-bulk-repository.abstract';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRoleDocument, UserRoleEntity } from '../schemas/user-role.schema';

@Injectable()
export class UserRoleBulkRepository
  extends DatabaseMongoBulkRepositoryAbstract<UserRoleDocument>
  implements IDatabaseBulkRepositoryAbstract
{
  constructor(
    @InjectModel(UserRoleEntity.name)
    private readonly userRoleModel: Model<UserRoleDocument>
  ) {
    super(userRoleModel);
  }
}
