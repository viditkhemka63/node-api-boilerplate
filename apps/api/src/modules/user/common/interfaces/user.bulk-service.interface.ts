import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
} from '@api/database/interface/database.interface';
import { UserCreateDto } from '../dto/user.create.dto';

export interface IUserBulkService {
  deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean>;

  createMany(
    data: UserCreateDto[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean>;
}
