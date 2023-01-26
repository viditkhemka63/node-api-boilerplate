import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '@api/modules/workspace/services/workspace.repository';
import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/database/interface/database.interface';
import { WorkspaceDocument } from '../schemas/workspace.schema';
import { WorkspaceUpdateDto } from '@api/modules/workspace/common/dto/workspace.update.dto';
import { WorkspaceCreateDto } from '@api/modules/workspace/common/dto/workspace.create.dto';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { WorkspaceListDto } from '@api/modules/workspace/common/dto/workspace.list.dto';
import { IWorkspaceService } from '@api/modules/workspace/common/interfaces/workspace.service.interface';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

@Injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly paginationService: PaginationService
  ) {}

  async findAndCountAll({
    page,
    perPage,
    sort,
    search,
    availableSort,
    availableSearch,
    isActive,
  }: WorkspaceListDto): Promise<IResponsePaging> {
    const skip: number = await this.paginationService.skip(page, perPage);
    const find: Record<string, any> = {
      isActive: {
        $in: isActive,
      },
      ...search,
    };

    const workspaces: WorkspaceDocument[] =
      await this.workspaceRepository.findAll<WorkspaceDocument>(find, {
        skip: skip,
        limit: perPage,
        sort,
      });

    const totalData: number = await this.workspaceRepository.getTotal(find);
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
      data: workspaces,
    };
  }

  async findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceDocument> {
    return this.workspaceRepository.findOneById<WorkspaceDocument>(
      _id,
      options
    );
  }

  async findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceDocument> {
    return this.workspaceRepository.findOne<WorkspaceDocument>(find, options);
  }

  async delete(id: string): Promise<WorkspaceDocument> {
    return this.workspaceRepository.deleteOneById(id);
  }

  async create(
    data: WorkspaceCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<WorkspaceDocument> {
    const create = {
      ...data,
    };

    return this.workspaceRepository.create(create, options);
  }

  async update(
    _id: string,
    data: WorkspaceUpdateDto,
    options?: IDatabaseOptions
  ): Promise<WorkspaceDocument> {
    return this.workspaceRepository.updateOneById<WorkspaceUpdateDto>(
      _id,
      data,
      options
    );
  }
}
