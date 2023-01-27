import { DatabaseMongoRepositoryAbstract } from '@api/database/abstracts/database.mongo-repository.abstract';
import { IDatabaseRepositoryAbstract } from '@api/common/interfaces/database.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  PermissionDocument,
  PermissionEntity,
} from '../models/permission.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PermissionRepository
  extends DatabaseMongoRepositoryAbstract<PermissionDocument>
  implements IDatabaseRepositoryAbstract<PermissionDocument>
{
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionDocument>
  ) {
    super(permissionModel);
  }
}
