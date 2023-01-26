import { IDatabaseBulkRepositoryAbstract } from '@api/common/interfaces/database.bulk.repository.interface';
import { DatabaseMongoBulkRepositoryAbstract } from '@api/database/abstracts/database.mongo-bulk-repository.abstract';
// import { DatabaseEntity } from '@api/database/decorators/database.decorator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PermissionDocument,
  PermissionEntity,
} from '../schemas/permission.schema';

@Injectable()
export class PermissionBulkRepository
  extends DatabaseMongoBulkRepositoryAbstract<PermissionDocument>
  implements IDatabaseBulkRepositoryAbstract
{
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionDocument>
  ) {
    super(permissionModel);
  }
}
