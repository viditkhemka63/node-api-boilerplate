import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
} from '@api/database/interface/database.interface';
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from '../common/dto/user.create.dto';
import { IUserBulkService } from '../common/interfaces/user.bulk-service.interface';
import { UserBulkRepository } from './user.bulk.repository';

@Injectable()
export class UserBulkService implements IUserBulkService {
  constructor(private readonly roleBulkRepository: UserBulkRepository) {}

  async deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    return this.roleBulkRepository.deleteMany(find, options);
  }

  async createMany(
    data: UserCreateDto[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean> {
    return this.roleBulkRepository.createMany<UserCreateDto>(data, options);
  }
}
