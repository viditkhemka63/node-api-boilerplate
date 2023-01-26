import { Injectable } from '@nestjs/common';
import { UserRepository } from '@api/modules/user/services/user.repository';
import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/database/interface/database.interface';
import { UserDocument } from '../schemas/user.schema';
import { UserUpdateDto } from '@api/modules/user/common/dto/user.update.dto';
import { UserCreateDto } from '@api/modules/user/common/dto/user.create.dto';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { UserListDto } from '@api/modules/user/common/dto/user.list.dto';
import { IUserService } from '@api/modules/user/common/interfaces/user.service.interface';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
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
  }: UserListDto): Promise<IResponsePaging> {
    const skip: number = await this.paginationService.skip(page, perPage);
    const find: Record<string, any> = {
      isActive: {
        $in: isActive,
      },
      ...search,
    };

    const users: UserDocument[] =
      await this.userRepository.findAll<UserDocument>(find, {
        skip: skip,
        limit: perPage,
        sort,
      });

    const totalData: number = await this.userRepository.getTotal(find);
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
      data: users,
    };
  }

  async findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<UserDocument> {
    return this.userRepository.findOneById<UserDocument>(_id, options);
  }

  async findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<UserDocument> {
    return this.userRepository.findOne<UserDocument>(find, options);
  }

  async delete(id: string): Promise<UserDocument> {
    return this.userRepository.deleteOneById(id);
  }

  async create(
    data: UserCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<UserDocument> {
    const create = {
      ...data,
    };

    return this.userRepository.create(create, options);
  }

  async update(
    _id: string,
    data: UserUpdateDto,
    options?: IDatabaseOptions
  ): Promise<UserDocument> {
    return this.userRepository.updateOneById<UserUpdateDto>(_id, data, options);
  }
}
