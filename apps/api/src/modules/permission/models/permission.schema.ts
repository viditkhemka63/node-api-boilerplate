import { STATUS } from '@api/common/constants/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class PermissionEntity {
  @Prop({
    required: true,
    index: true,
    uppercase: true,
    unique: true,
    trim: true,
  })
  code: string;

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
    type: String,
    enum: STATUS,
    default: STATUS['ACTIVE'],
  })
  status: STATUS;

  @Prop({ default: now(), required: false })
  createdAt: Date;

  @Prop({ default: now(), required: false })
  updatedAt: Date;

  @Prop({ required: false })
  deletedAt: Date;
}

export const PermissionDatabaseName = 'permissions';
export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);

export type PermissionDocument = PermissionEntity & Document;

// Hooks
PermissionSchema.pre<PermissionDocument>('save', function (next) {
  this.code = this.code.toUpperCase();
  this.name = this.name.toLowerCase();

  next();
});
