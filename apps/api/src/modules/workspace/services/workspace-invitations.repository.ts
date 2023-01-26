import { DatabaseMongoRepositoryAbstract } from '@api/database/abstracts/database.mongo-repository.abstract';
import { IDatabaseRepositoryAbstract } from '@api/common/interfaces/database.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  WorkspaceInvitationsDocument,
  WorkspaceInvitationsEntity,
} from '../schemas/workspace-invitations.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WorkspaceInvitationsRepository
  extends DatabaseMongoRepositoryAbstract<WorkspaceInvitationsDocument>
  implements IDatabaseRepositoryAbstract<WorkspaceInvitationsDocument>
{
  constructor(
    @InjectModel(WorkspaceInvitationsEntity.name)
    private readonly workspaceInvitationsModel: Model<WorkspaceInvitationsDocument>
  ) {
    super(workspaceInvitationsModel);
  }
}
