import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
} from '@api/database/interface/database.interface';
import { Injectable } from '@nestjs/common';
import { UserRoleCreateDto } from '../common/dto/user-role.create.dto';
import { IUserRoleBulkService } from '../common/interfaces/role.bulk-service.interface';
import { UserRoleBulkRepository } from './user-role.bulk.repository';

@Injectable()
export class UserRoleBulkService implements IUserRoleBulkService {
  constructor(private readonly roleBulkRepository: UserRoleBulkRepository) {}

  async deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    return this.roleBulkRepository.deleteMany(find, options);
  }

  async createMany(
    data: UserRoleCreateDto[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean> {
    return this.roleBulkRepository.createMany<UserRoleCreateDto>(data, options);
  }
}
