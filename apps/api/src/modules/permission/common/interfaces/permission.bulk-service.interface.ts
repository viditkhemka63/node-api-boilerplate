import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
} from '@api/common/interfaces/database.interface';
// import { IAuthPermission } from 'src/common/auth/interfaces/auth.interface';

export interface IPermissionBulkService {
  createMany(
    data: any[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean>;

  deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean>;
}
