import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '@api/modules/user-role/services/user-role.repository';
import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/database/interface/database.interface';
import { UserRoleDocument, UserRoleEntity } from '../schemas/user-role.schema';
import { UserRoleUpdateDto } from '@api/modules/user-role/common/dto/user-role.update.dto';
import { UserRoleCreateDto } from '@api/modules/user-role/common/dto/user-role.create.dto';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { UserRoleListDto } from '@api/modules/user-role/common/dto/user-role.list.dto';
import { IUserRoleService } from '@api/modules/user-role/common/interfaces/user-role.service.interface';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { STATUS } from '@api/common/constants/common';

@Injectable()
export class UserRoleService implements IUserRoleService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly paginationService: PaginationService
  ) {}

  async findAndCountAll({
    page,
    perPage,
    sort,
    search,
    availableSort,
    availableSearch,
  }: UserRoleListDto): Promise<IResponsePaging> {
    const skip: number = await this.paginationService.skip(page, perPage);
    const find: Record<string, any> = {
      // isActive: {
      //   $in: isActive,
      // },
      ...search,
    };

    const userRoles: UserRoleDocument[] =
      await this.userRoleRepository.findAll<UserRoleDocument>(find, {
        skip: skip,
        limit: perPage,
        sort,
      });

    const totalData: number = await this.userRoleRepository.getTotal(find);
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
      data: userRoles,
    };
  }

  async findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<UserRoleDocument> {
    return this.userRoleRepository.findOneById<UserRoleDocument>(_id, options);
  }

  async findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<UserRoleDocument> {
    return this.userRoleRepository.findOne<UserRoleDocument>(find, options);
  }

  async delete(id: string): Promise<UserRoleDocument> {
    return this.userRoleRepository.deleteOneById(id);
  }

  async create(
    data: UserRoleCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<UserRoleDocument> {
    const create = {
      ...data,
    };

    return this.userRoleRepository.create(create, options);
  }

  async update(
    _id: string,
    data: UserRoleUpdateDto,
    options?: IDatabaseOptions
  ): Promise<UserRoleDocument> {
    return this.userRoleRepository.updateOneById<UserRoleUpdateDto>(
      _id,
      data,
      options
    );
  }

  async createSuperAdmin(
    options?: IDatabaseCreateOptions
  ): Promise<UserRoleDocument> {
    const create = {
      name: 'superadmin',
      permissions: [],
      status: STATUS.ACTIVE,
      // accessFor: ENUM_AUTH_ACCESS_FOR.SUPER_ADMIN,
    };

    return this.userRoleRepository.create(create, options);
  }
}
