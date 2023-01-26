import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { INVITATION_STATUS, STATUS } from '@api/common/constants/common';
import { UserRoleEntity } from '@api/modules/user-role/schemas/user-role.schema';
import { WorkspaceEntity } from './workspace.schema';

@Schema({ timestamps: true, versionKey: false })
export class WorkspaceInvitationsEntity {
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
    ref: UserRoleEntity.name,
    index: true,
  })
  roleId: Types.ObjectId;

  @Prop({
    required: true,
  })
  to: string;

  // @Prop({
  //   required: true,
  // })
  // invitedBy: string;

  @Prop({
    required: true,
  })
  token: string;

  //   -------------------------------------------
  //   ------------ common columns start ---------
  //   -------------------------------------------

  @Prop({
    required: true,
    type: String,
    enum: INVITATION_STATUS,
    default: INVITATION_STATUS['PENDING'],
  })
  status: INVITATION_STATUS;

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

export const WorkspaceInvitationsDatabaseName = 'WorkspaceInvitations';
export const WorkspaceInvitationsSchema = SchemaFactory.createForClass(
  WorkspaceInvitationsEntity
);

export type WorkspaceInvitationsDocument = WorkspaceInvitationsEntity &
  Document;
