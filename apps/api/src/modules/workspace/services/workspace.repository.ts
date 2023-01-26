import { DatabaseMongoRepositoryAbstract } from '@api/database/abstracts/database.mongo-repository.abstract';
import { IDatabaseRepositoryAbstract } from '@api/common/interfaces/database.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  WorkspaceDocument,
  WorkspaceEntity,
} from '../schemas/workspace.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WorkspaceRepository
  extends DatabaseMongoRepositoryAbstract<WorkspaceDocument>
  implements IDatabaseRepositoryAbstract<WorkspaceDocument>
{
  constructor(
    @InjectModel(WorkspaceEntity.name)
    private readonly workspaceModel: Model<WorkspaceDocument>
  ) {
    super(workspaceModel);
  }
}
