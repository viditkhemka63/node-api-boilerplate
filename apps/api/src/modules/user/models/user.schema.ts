import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { STATUS } from '@api/common/constants/common';

@Schema({ timestamps: true, versionKey: false })
export class UserEntity {
  @Prop({
    required: false,
    default: null,
    trim: true,
  })
  firstName: string;

  @Prop({
    required: false,
    default: null,
    trim: true,
  })
  lastName: string;

  @Prop({
    required: false,
    default: null,
    unique: true,
    trim: true,
  })
  mobile: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  // @Prop({
  //   required: true,
  //   type: Types.ObjectId,
  //   ref: UserRoleEntity.name,
  //   index: true,
  // })
  // role: Types.ObjectId;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  salt: string;

  // @Prop({
  //   required: false,
  //   _id: false,
  //   type: {
  //     path: String,
  //     pathWithFilename: String,
  //     filename: String,
  //     completedUrl: String,
  //     baseUrl: String,
  //     mime: String,
  //   },
  // })
  // photo?: AwsS3Serialization;

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

export const UserDatabaseName = 'User';
export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDocument = UserEntity & Document;
