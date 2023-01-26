import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@api/modules/permission/services/permission.repository';
import {
  IDatabaseCreateOptions,
  IDatabaseSoftDeleteOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
  IDatabaseFindAllOptions,
} from '@api/database/interface/database.interface';
import {
  PermissionDocument,
  PermissionEntity,
} from '../schemas/permission.schema';
import { PermissionUpdateDto } from '@api/modules/permission/common/dto/permission.update.dto';
import { PermissionActiveDto } from '@api/modules/permission/common/dto/permission.active.dto';
import { PermissionCreateDto } from '@api/modules/permission/common/dto/permission.create.dto';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { PermissionListDto } from '@api/modules/permission/common/dto/permission.list.dto';
import { IPermissionService } from '@api/modules/permission/common/interfaces/permission.service.interface';

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
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
  }: PermissionListDto) {
    const skip: number = await this.paginationService.skip(page, perPage);
    const find: Record<string, any> = {
      isActive: {
        $in: isActive,
      },
      ...search,
    };

    const permissions: PermissionDocument[] =
      await this.permissionRepository.findAll<PermissionDocument>(find, {
        skip: skip,
        limit: perPage,
        sort,
      });

    const totalData: number = await this.permissionRepository.getTotal(find);
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
      data: permissions,
    };
  }

  async findAll(
    find,
    options: IDatabaseFindAllOptions
  ): Promise<PermissionDocument[]> {
    return this.permissionRepository.findAll<PermissionDocument>(find, options);
  }

  async findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<PermissionDocument> {
    return this.permissionRepository.findOneById<PermissionDocument>(
      _id,
      options
    );
  }

  async findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<PermissionDocument> {
    return this.permissionRepository.findOne<PermissionDocument>(find, options);
  }

  async deleteOne(
    find: Record<string, any>,
    options?: IDatabaseSoftDeleteOptions
  ): Promise<PermissionDocument> {
    return this.permissionRepository.deleteOne(find, options);
  }

  async create(
    data: PermissionCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<PermissionDocument> {
    const create: PermissionEntity = {
      ...data,
      isActive: true,
    };

    return this.permissionRepository.create<PermissionEntity>(create, options);
  }

  async update(
    _id: string,
    data: PermissionUpdateDto,
    options?: IDatabaseOptions
  ): Promise<PermissionDocument> {
    return this.permissionRepository.updateOneById<PermissionUpdateDto>(
      _id,
      data,
      options
    );
  }

  async inactive(
    _id: string,
    options?: IDatabaseOptions
  ): Promise<PermissionDocument> {
    const update: PermissionActiveDto = {
      isActive: false,
    };

    return this.permissionRepository.updateOneById<PermissionActiveDto>(
      _id,
      update,
      options
    );
  }

  async active(
    _id: string,
    options?: IDatabaseOptions
  ): Promise<PermissionDocument> {
    const update: PermissionActiveDto = {
      isActive: true,
    };

    return this.permissionRepository.updateOneById<PermissionActiveDto>(
      _id,
      update,
      options
    );
  }
}
