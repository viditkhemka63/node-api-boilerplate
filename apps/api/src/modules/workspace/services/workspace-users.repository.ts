import { DatabaseMongoRepositoryAbstract } from '@api/database/abstracts/database.mongo-repository.abstract';
import { IDatabaseRepositoryAbstract } from '@api/common/interfaces/database.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  WorkspaceUsersDocument,
  WorkspaceUsersEntity,
} from '../schemas/workspace-users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspaceEntity } from '../schemas/workspace.schema';
import { UserRoleEntity } from '@api/modules/user-role/models/user-role.schema';

@Injectable()
export class WorkspaceUsersRepository
  extends DatabaseMongoRepositoryAbstract<WorkspaceUsersDocument>
  implements IDatabaseRepositoryAbstract<WorkspaceUsersDocument>
{
  constructor(
    @InjectModel(WorkspaceUsersEntity.name)
    private readonly workspaceUsersModel: Model<WorkspaceUsersDocument>
  ) {
    super(workspaceUsersModel, [
      {
        path: 'workspaceId',
        model: WorkspaceEntity.name,
      },
      {
        path: 'roleId',
        model: UserRoleEntity.name,
      },
    ]);
  }
}
