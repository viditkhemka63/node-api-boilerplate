import {
  IDatabaseCreateOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
} from '@api/common/interfaces/database.interface';
import { UserRoleCreateDto } from '@api/modules/user-role/common/dto/user-role.create.dto';
import { UserRoleUpdateDto } from '@api/modules/user-role/common/dto/user-role.update.dto';
import { UserRoleDocument } from '@api/modules/user-role/models/user-role.schema';
import { UserRoleListDto } from '@api/modules/user-role/common/dto/user-role.list.dto';
import { IResponsePaging } from '@api/common/interfaces/response.interface';

export interface IUserRoleService {
  findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<UserRoleDocument>;

  findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<UserRoleDocument>;

  findAndCountAll(query: UserRoleListDto): Promise<IResponsePaging>;

  createSuperAdmin(options?: IDatabaseCreateOptions): Promise<UserRoleDocument>;

  delete(id: string): Promise<UserRoleDocument>;

  create(
    data: UserRoleCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<UserRoleDocument>;

  update(
    _id: string,
    data: UserRoleUpdateDto,
    options?: IDatabaseOptions
  ): Promise<UserRoleDocument>;
}
