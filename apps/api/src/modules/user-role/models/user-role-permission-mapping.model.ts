import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { STATUS, STATUS_LIST } from '@api/common/constants/common';
import { PermissionModel } from '@api/modules/permission/models/permission.model';
import { UserRoleModel } from './user-role.model';

@Table
export class UserRolePermissionMappingModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserRoleModel)
  @Column(DataType.UUID)
  roleId: string;

  @BelongsTo(() => UserRoleModel, 'roleId')
  userRoleModel: UserRoleModel;

  @ForeignKey(() => PermissionModel)
  @Column(DataType.UUID)
  permissionId: string;

  @BelongsTo(() => PermissionModel, 'permissionId')
  permissionModel: PermissionModel;

  //   -------------------------------------------
  //   ------------ common columns start ---------
  //   -------------------------------------------

  @Default(STATUS['ACTIVE'])
  @Column({
    type: DataType.ENUM({
      values: STATUS_LIST,
    }),
  })
  status: string;

  @CreatedAt
  createdAt: Date;

  @AllowNull
  @Column(DataType.UUID)
  createdBy: string;

  @DeletedAt
  deletedAt: Date;

  @AllowNull
  @Column(DataType.UUID)
  deletedBy: string;

  //   -------------------------------------------
  //   ------------ common columns end ---------
  //   -------------------------------------------
}
