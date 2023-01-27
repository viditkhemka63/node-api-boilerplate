import { PermissionModel } from '@api/modules/permission/models/permission.model';
import { UserRolePermissionMappingModel } from '@api/modules/user-role/models/user-role-permission-mapping.model';
import { UserRoleModel } from '@api/modules/user-role/models/user-role.model';
import { UserModel } from '@api/modules/user/models/user.model';

export const SequilizeModels = [
  PermissionModel,
  UserRoleModel,
  UserModel,
  UserRolePermissionMappingModel,
];
