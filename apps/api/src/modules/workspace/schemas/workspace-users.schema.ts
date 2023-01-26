import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { STATUS } from '@api/common/constants/common';
import { WorkspaceEntity } from './workspace.schema';
import { UserRoleEntity } from '@api/modules/user-role/schemas/user-role.schema';
import { UserEntity } from '@api/modules/user/schemas/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class WorkspaceUsersEntity {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: WorkspaceEntity.name,
    index: true,
  })
  workspaceId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserEntity.name,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserRoleEntity.name,
    index: true,
  })
  roleId: Types.ObjectId;

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

export const WorkspaceUsersDatabaseName = 'WorkspaceUsers';
export const WorkspaceUsersSchema =
  SchemaFactory.createForClass(WorkspaceUsersEntity);

export type WorkspaceUsersDocument = WorkspaceUsersEntity & Document;
