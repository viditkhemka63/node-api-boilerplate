import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { STATUS, STATUS_LIST } from '@api/common/constants/common';
import { UserModel } from '@api/modules/user/models/user.model';

@Table
export class PermissionModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique
  @Column({
    type: DataType.STRING,
  })
  code: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column(DataType.STRING)
  description: string;

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
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @AllowNull
  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  createdBy: string;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @AllowNull
  @ForeignKey(() => UserModel)
  @Column(DataType.UUID)
  updatedBy: string;

  // @AllowNull
  @DeletedAt
  @Column({
    type: DataType.DATE,
    defaultValue: null,
  })
  deletedAt: Date;

  @AllowNull
  @Column(DataType.UUID)
  deletedBy: string;

  //   -------------------------------------------
  //   ------------ common columns end ---------
  //   -------------------------------------------
}
