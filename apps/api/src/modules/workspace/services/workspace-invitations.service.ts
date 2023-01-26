import { INVITATION_STATUS } from '@api/common/constants/common';
import { Injectable } from '@nestjs/common';
import { WorkspaceInvitationsRepository } from '@api/modules/workspace/services/workspace-invitations.repository';
import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/database/interface/database.interface';
import { WorkspaceInvitationsDocument } from '../schemas/workspace-invitations.schema';
import { WorkspaceInvitationsUpdateDto } from '@api/modules/workspace/common/dto/workspace-invitations.update.dto';
import { WorkspaceInvitationsCreateDto } from '@api/modules/workspace/common/dto/workspace-invitations.create.dto';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { IWorkspaceInvitationsService } from '@api/modules/workspace/common/interfaces/workspace-invitations.service.interface';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

@Injectable()
export class WorkspaceInvitationsService
  implements IWorkspaceInvitationsService
{
  constructor(
    private readonly workspaceInvitationsRepository: WorkspaceInvitationsRepository,
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

    const workspaceInvitationss: WorkspaceInvitationsDocument[] =
      await this.workspaceInvitationsRepository.findAll<WorkspaceInvitationsDocument>(
        find,
        {
          skip: skip,
          limit: perPage,
          sort,
        }
      );

    const totalData: number =
      await this.workspaceInvitationsRepository.getTotal(find);
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
      data: workspaceInvitationss,
    };
  }

  async findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceInvitationsDocument> {
    return this.workspaceInvitationsRepository.findOneById<WorkspaceInvitationsDocument>(
      _id,
      options
    );
  }

  async findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<WorkspaceInvitationsDocument> {
    return this.workspaceInvitationsRepository.findOne<WorkspaceInvitationsDocument>(
      find,
      options
    );
  }

  async delete(id: string): Promise<WorkspaceInvitationsDocument> {
    return this.workspaceInvitationsRepository.deleteOneById(id);
  }

  async create(
    data: WorkspaceInvitationsCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<WorkspaceInvitationsDocument> {
    const create = {
      ...data,
    };

    return this.workspaceInvitationsRepository.create(create, options);
  }

  async acceptInvitation(
    _id: string,
    options?: IDatabaseOptions
  ): Promise<WorkspaceInvitationsDocument> {
    return this.workspaceInvitationsRepository.updateOneById(
      _id,
      {
        status: INVITATION_STATUS.ACCEPTED,
      },
      options
    );
  }

  async update(
    _id: string,
    data: WorkspaceInvitationsUpdateDto,
    options?: IDatabaseOptions
  ): Promise<WorkspaceInvitationsDocument> {
    return this.workspaceInvitationsRepository.updateOneById<WorkspaceInvitationsUpdateDto>(
      _id,
      data,
      options
    );
  }
}
