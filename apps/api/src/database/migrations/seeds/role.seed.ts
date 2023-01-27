import { ENUM_AUTH_PERMISSIONS } from '@api/modules/auth/constants/auth.enum.permission.constant';
import { PERMISSION_SERVICE } from '@api/modules/permission/common/constants/permission.list.constant';
import { IPermissionService } from '@api/modules/permission/common/interfaces/permission.service.interface';
import { PermissionDocument } from '@api/modules/permission/models/permission.schema';
import {
  USER_ROLE_BULK_SERVICE,
  USER_ROLE_SERVICE,
} from '@api/modules/user-role/common/constants/user-role.list.constant';
import { IUserRoleBulkService } from '@api/modules/user-role/common/interfaces/role.bulk-service.interface';
import { IUserRoleService } from '@api/modules/user-role/common/interfaces/user-role.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RoleSeed {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: IPermissionService,

    @Inject(USER_ROLE_BULK_SERVICE)
    private readonly roleBulkService: IUserRoleBulkService,

    @Inject(USER_ROLE_SERVICE)
    private readonly roleService: IUserRoleService
  ) {}

  async insert(): Promise<void> {
    const permissions: PermissionDocument[] =
      await this.permissionService.findAll({
        code: { $in: Object.values(ENUM_AUTH_PERMISSIONS) },
      });

    try {
      const permissionsMap = permissions.map((val) => val._id);
      await this.roleService.createSuperAdmin();
      await this.roleBulkService.createMany([
        {
          name: 'admin',
          permissions: permissionsMap,
          //   accessFor: ENUM_AUTH_ACCESS_FOR.ADMIN,
        },
        {
          name: 'user',
          permissions: [],
          //   accessFor: ENUM_AUTH_ACCESS_FOR.USER,
        },
      ]);
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }

  async remove(): Promise<void> {
    try {
      await this.roleBulkService.deleteMany({});
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }
}
