import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/common/interfaces/database.interface';
import { WorkspaceInvitationsCreateDto } from '@api/modules/workspace/common/dto/workspace-invitations.create.dto';
import { WorkspaceInvitationsUpdateDto } from '@api/modules/workspace/common/dto/workspace-invitations.update.dto';
import { WorkspaceInvitationsDocument } from '@api/modules/workspace/schemas/workspace-invitations.schema';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { WorkspaceListDto } from '../dto/workspace.list.dto';

export interface IWorkspaceInvitationsService {
  findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceInvitationsDocument>;

  findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceInvitationsDocument>;

  findAndCountAll(query: WorkspaceListDto): Promise<IResponsePaging>;

  delete(id: string): Promise<WorkspaceInvitationsDocument>;

  create(
    data: WorkspaceInvitationsCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<WorkspaceInvitationsDocument>;

  update(
    _id: string,
    data: WorkspaceInvitationsUpdateDto,
    options?: IDatabaseOptions
  ): Promise<WorkspaceInvitationsDocument>;

  acceptInvitation(
    _id: string,
    options?: IDatabaseOptions
  ): Promise<WorkspaceInvitationsDocument>;
}
