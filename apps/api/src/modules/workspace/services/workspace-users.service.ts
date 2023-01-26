import { Injectable } from '@nestjs/common';
import { WorkspaceUsersRepository } from '@api/modules/workspace/services/workspace-users.repository';
import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
  IDatabaseSoftDeleteOptions,
} from '@api/database/interface/database.interface';
import { WorkspaceUsersDocument } from '../schemas/workspace-users.schema';
import { WorkspaceUsersUpdateDto } from '@api/modules/workspace/common/dto/workspace-users.update.dto';
import { WorkspaceUsersCreateDto } from '@api/modules/workspace/common/dto/workspace-users.create.dto';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { IWorkspaceUsersService } from '@api/modules/workspace/common/interfaces/workspace-users.service.interface';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

@Injectable()
export class WorkspaceUsersService implements IWorkspaceUsersService {
  constructor(
    private readonly workspaceUsersRepository: WorkspaceUsersRepository,
    private readonly paginationService: PaginationService
  ) {}

  async findAndCountAll({
    page,
    perPage,
    sort,
    search,
    availableSort,
    availableSearch,
  }: any): Promise<IResponsePaging> {
    const skip: number = await this.paginationService.skip(page, perPage);
    const find: Record<string, any> = {
      ...search,
    };

    const workspaceUserss: WorkspaceUsersDocument[] =
      await this.workspaceUsersRepository.findAll<WorkspaceUsersDocument>(
        find,
        {
          skip: skip,
          limit: perPage,
          sort,
        }
      );

    const totalData: number = await this.workspaceUsersRepository.getTotal(
      find
    );
    const totalPage: number = await this.paginationService.totalPage(
      totalData,
      perPage
    );

    return {
      totalData,
      totalPage,
      currentPage: page,
      perPage,
      availableSearch,
      availableSort,
      data: workspaceUserss,
    };
  }

  async findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceUsersDocument> {
    return this.workspaceUsersRepository.findOneById<WorkspaceUsersDocument>(
      _id,
      options
    );
  }

  async findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceUsersDocument> {
    return this.workspaceUsersRepository.findOne<WorkspaceUsersDocument>(
      find,
      options
    );
  }

  async delete(id: string): Promise<WorkspaceUsersDocument> {
    return this.workspaceUsersRepository.deleteOneById(id);
  }

  async deleteOne(
    find: Record<string, any>,
    options?: IDatabaseSoftDeleteOptions
  ): Promise<WorkspaceUsersDocument> {
    return this.workspaceUsersRepository.deleteOne(find, options);
  }

  async create(
    data: WorkspaceUsersCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<WorkspaceUsersDocument> {
    const create = {
      ...data,
    };

    return this.workspaceUsersRepository.create(create, options);
  }

  async update(
    _id: string,
    data: WorkspaceUsersUpdateDto,
    options?: IDatabaseOptions
  ): Promise<WorkspaceUsersDocument> {
    return this.workspaceUsersRepository.updateOneById<WorkspaceUsersUpdateDto>(
      _id,
      data,
      options
    );
  }
}
