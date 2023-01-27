import { PermissionModel } from '@api/modules/permission/models/permission.model';
import { STATUS } from '@api/common/constants/common';
import { PaginationService } from '@core/pagination/service/pagination.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Optional } from 'sequelize';
import { PermissionCreateDto } from '../common/dto/permission.create.dto';
import { PermissionListDto } from '../common/dto/permission.list.dto';
import { IPermissionService } from '../common/interfaces/permission.service.interface';
import { PermissionUpdateDto } from '../common/dto/permission.update.dto';
import { PermissionActiveDto } from '../common/dto/permission.active.dto';

@Injectable()
export class PermissionSqlService implements IPermissionService {
  constructor(
    @InjectModel(PermissionModel) private permission: typeof PermissionModel,
    private readonly paginationService: PaginationService
  ) {}

  async findAndCountAll({
    page,
    perPage,
    sort,
    search,
    availableSort,
    availableSearch,
    status,
  }: PermissionListDto) {
    const find: Record<string, any> = {
      status,
    };
    console.log('SQL service called');
    const { rows, count } = await this.permission.findAndCountAll({
      where: {},
      offset: (page - 1) * perPage,
      limit: perPage,
    });

    const totalPage: number = await this.paginationService.totalPage(
      count,
      perPage
    );

    return {
      totalData: count,
      totalPage,
      currentPage: page,
      perPage,
      availableSearch,
      availableSort,
      data: rows,
    };
  }

  findOneById(_id: string): Promise<any> {
    return this.permission.findByPk(_id);
  }

  findAll(find: Record<string, any>) {
    return this.permission.findAll({
      where: find,
    });
  }

  findOne(find: Record<string, any>): Promise<any> {
    return this.permission.findOne({
      where: find,
    });
  }

  create(data: PermissionCreateDto) {
    const create: Optional<any, string> = {
      ...data,
      status: STATUS['ACTIVE'],
    };

    return this.permission.create(create);
  }

  async update(id: string, data: PermissionUpdateDto) {
    await this.permission.update(data, {
      where: { id },
    });

    return this.findOneById(id);
  }

  async inactive(id: string) {
    const update: PermissionActiveDto = {
      status: STATUS['INACTIVE'],
    };

    return this.permission.update(update, {
      where: { id },
    });
  }

  async active(id: string) {
    const update: PermissionActiveDto = {
      status: STATUS['ACTIVE'],
    };

    return this.permission.update(update, {
      where: { id },
    });
  }

  async deleteOne(find: Record<string, any>) {
    return this.permission.destroy({
      where: find,
      force: true,
    });
  }
}
