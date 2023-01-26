import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { STATUS } from '@api/common/constants/common';

@Schema({ timestamps: true, versionKey: false })
export class WorkspaceEntity {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    index: true,
    lowercase: true,
    unique: true,
  })
  slug: string;

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

export const WorkspaceDatabaseName = 'Workspace';
export const WorkspaceSchema = SchemaFactory.createForClass(WorkspaceEntity);

export type WorkspaceDocument = WorkspaceEntity & Document;
