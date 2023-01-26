import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
  IDatabaseSoftDeleteOptions,
} from '@api/common/interfaces/database.interface';
import { WorkspaceUsersCreateDto } from '@api/modules/workspace/common/dto/workspace-users.create.dto';
import { WorkspaceUsersUpdateDto } from '@api/modules/workspace/common/dto/workspace-users.update.dto';
import { WorkspaceUsersDocument } from '@api/modules/workspace/schemas/workspace-users.schema';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { WorkspaceListDto } from '../dto/workspace.list.dto';

export interface IWorkspaceUsersService {
  findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceUsersDocument>;

  findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceUsersDocument>;

  findAndCountAll(query: WorkspaceListDto): Promise<IResponsePaging>;

  create(
    data: WorkspaceUsersCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<WorkspaceUsersDocument>;

  update(
    _id: string,
    data: WorkspaceUsersUpdateDto,
    options?: IDatabaseOptions
  ): Promise<WorkspaceUsersDocument>;

  delete(id: string): Promise<WorkspaceUsersDocument>;

  deleteOne(
    find: Record<string, any>,
    options?: IDatabaseSoftDeleteOptions
  ): Promise<WorkspaceUsersDocument>;
}
