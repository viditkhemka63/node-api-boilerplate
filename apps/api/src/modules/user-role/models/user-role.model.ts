import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { STATUS, STATUS_LIST } from '@api/common/constants/common';

@Table
export class UserRoleModel extends Model {
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
