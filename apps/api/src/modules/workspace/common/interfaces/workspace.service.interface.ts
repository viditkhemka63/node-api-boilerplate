import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/common/interfaces/database.interface';
import { WorkspaceCreateDto } from '@api/modules/workspace/common/dto/workspace.create.dto';
import { WorkspaceUpdateDto } from '@api/modules/workspace/common/dto/workspace.update.dto';
import { WorkspaceDocument } from '@api/modules/workspace/schemas/workspace.schema';
import { WorkspaceListDto } from '@api/modules/workspace/common/dto/workspace.list.dto';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

export interface IWorkspaceService {
  findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceDocument>;

  findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceDocument>;

  findAndCountAll(query: WorkspaceListDto): Promise<IResponsePaging>;

  delete(id: string): Promise<WorkspaceDocument>;

  create(
    data: WorkspaceCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<WorkspaceDocument>;

  update(
    _id: string,
    data: WorkspaceUpdateDto,
    options?: IDatabaseOptions
  ): Promise<WorkspaceDocument>;
}
