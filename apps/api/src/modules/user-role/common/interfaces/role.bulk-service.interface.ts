import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
} from '@api/database/interface/database.interface';
import { UserRoleCreateDto } from '../dto/user-role.create.dto';

export interface IUserRoleBulkService {
  deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean>;

  createMany(
    data: UserRoleCreateDto[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean>;
}
