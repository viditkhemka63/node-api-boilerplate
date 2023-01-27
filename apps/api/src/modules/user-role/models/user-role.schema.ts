import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { STATUS } from '@api/common/constants/common';
import { PermissionEntity } from '@api/modules/permission/models/permission.schema';

@Schema({ timestamps: true, versionKey: false })
export class UserRoleEntity {
  @Prop({
    required: true,
    lowercase: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    type: Array,
    default: [],
    ref: PermissionEntity.name,
  })
  permissions: Types.ObjectId[];

  //   -------------------------------------------
  //   ------------ common columns start ---------
  //   -------------------------------------------

  @Prop({
    required: true,
    type: String,
    enum: STATUS,
    default: STATUS['ACTIVE'],
  })
  status: STATUS;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  //   -------------------------------------------
  //   ------------ common columns end ---------
  //   -------------------------------------------
}

export const UserRoleDatabaseName = 'UserRole';
export const UserRoleSchema = SchemaFactory.createForClass(UserRoleEntity);

export type UserRoleDocument = UserRoleEntity & Document;
