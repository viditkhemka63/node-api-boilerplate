import {
  IDatabaseCreateManyOptions,
  IDatabaseManyOptions,
} from '@api/database/interface/database.interface';
import { Injectable } from '@nestjs/common';
import { PermissionCreateDto } from '../common/dto/permission.create.dto';
import { IPermissionBulkService } from '../common/interfaces/permission.bulk-service.interface';
import { PermissionBulkRepository } from './permission.bulk.repository';

@Injectable()
export class PermissionBulkService implements IPermissionBulkService {
  constructor(private readonly roleBulkRepository: PermissionBulkRepository) {}

  async deleteMany(
    find: Record<string, any>,
    options?: IDatabaseManyOptions
  ): Promise<boolean> {
    return this.roleBulkRepository.deleteMany(find, options);
  }

  async createMany(
    data: PermissionCreateDto[],
    options?: IDatabaseCreateManyOptions
  ): Promise<boolean> {
    return this.roleBulkRepository.createMany<PermissionCreateDto>(
      data,
      options
    );
  }
}
