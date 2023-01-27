import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/common/interfaces/database.interface';
import { UserCreateDto } from '@api/modules/user/common/dto/user.create.dto';
import { UserUpdateDto } from '@api/modules/user/common/dto/user.update.dto';
import { UserDocument } from '@api/modules/user/models/user.schema';
import { UserListDto } from '@api/modules/user/common/dto/user.list.dto';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

export interface IUserService {
  findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<UserDocument>;

  findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<UserDocument>;

  findAndCountAll(query: UserListDto): Promise<IResponsePaging>;

  delete(id: string): Promise<UserDocument>;

  create(
    data: UserCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<UserDocument>;

  update(
    _id: string,
    data: UserUpdateDto,
    options?: IDatabaseOptions
  ): Promise<UserDocument>;
}
