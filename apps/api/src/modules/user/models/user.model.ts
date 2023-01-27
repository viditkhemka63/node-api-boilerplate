import { STATUS, STATUS_LIST } from '@api/common/constants/common';
import { UserRoleModel } from '@api/modules/user-role/models/user-role.model';
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  firstName: string;

  @AllowNull
  @Column(DataType.STRING)
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  salt: string;

  @Unique
  @Column(DataType.STRING)
  mobile: string;

  // @AllowNull
  // @Column({
  //   type: DataType.ENUM({
  //     values: GENDERS_LIST,
  //   }),
  // })
  // gender: string;

  // @ForeignKey(() => File)
  // @Column(DataType.UUID)
  // avatarId: string;

  // @BelongsTo(() => File, 'avatarId')
  // avatar: File;

  @ForeignKey(() => UserRoleModel)
  @Column(DataType.UUID)
  roleId: string;

  @BelongsTo(() => UserRoleModel, 'roleId')
  role: UserRoleModel;

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
