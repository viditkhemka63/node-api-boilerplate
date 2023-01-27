import { DatabaseMongoRepositoryAbstract } from '@api/database/abstracts/database.mongo-repository.abstract';
import { IDatabaseRepositoryAbstract } from '@api/common/interfaces/database.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserRoleDocument, UserRoleEntity } from '../models/user-role.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRoleRepository
  extends DatabaseMongoRepositoryAbstract<UserRoleDocument>
  implements IDatabaseRepositoryAbstract<UserRoleDocument>
{
  constructor(
    @InjectModel(UserRoleEntity.name)
    private readonly userRoleModel: Model<UserRoleDocument>
  ) {
    super(userRoleModel);
  }
}
