import {
  IDatabaseCreateOptions,
  IDatabaseFindAllOptions,
  IDatabaseFindOneOptions,
  IDatabaseOptions,
  IDatabaseSoftDeleteOptions,
} from '@api/common/interfaces/database.interface';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { PermissionCreateDto } from '@api/modules/permission/common/dto/permission.create.dto';
import { PermissionUpdateDto } from '@api/modules/permission/common/dto/permission.update.dto';
import { PermissionDocument } from '@api/modules/permission/schemas/permission.schema';
import { PermissionListDto } from '../dto/permission.list.dto';

export interface IPermissionService {
  findAndCountAll(query: PermissionListDto): Promise<IResponsePaging>;

  findOneById(
    _id: string,
    options?: IDatabaseFindOneOptions
  ): Promise<PermissionDocument>;

  findAll(
    find: any,
    options?: IDatabaseFindAllOptions
  ): Promise<PermissionDocument[]>;

  findOne(
    find: Record<string, any>,
    options?: IDatabaseFindOneOptions
  ): Promise<PermissionDocument>;

  deleteOne(
    find: Record<string, any>,
    options?: IDatabaseSoftDeleteOptions
  ): Promise<PermissionDocument>;

  create(
    data: PermissionCreateDto,
    options?: IDatabaseCreateOptions
  ): Promise<PermissionDocument>;

  update(
    _id: string,
    data: PermissionUpdateDto,
    options?: IDatabaseOptions
  ): Promise<PermissionDocument>;

  inactive(
    _id: string,
    options?: IDatabaseOptions
  ): Promise<PermissionDocument>;

  active(_id: string, options?: IDatabaseOptions): Promise<PermissionDocument>;
}
