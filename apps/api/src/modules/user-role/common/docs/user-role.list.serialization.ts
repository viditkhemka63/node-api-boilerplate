import { PartialType } from '@nestjs/swagger';
import { UserRoleGetSerialization } from './user-role.get.serialization';

export class UserRoleListSerialization extends PartialType(
  UserRoleGetSerialization
) {}
