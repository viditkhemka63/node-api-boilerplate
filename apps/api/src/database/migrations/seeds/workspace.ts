import { WorkspaceDocument } from './../../../modules/workspace/schemas/workspace.schema';
import {
  ADMIN_USER_EMAIL,
  DEFAULT_ORGANIZATION_NAME,
} from '@api/database/constants/database.constant';

import {
  WORKSPACE_SERVICE,
  WORKSPACE_USERS_SERVICE,
} from '@api/modules/workspace/common/constants/workspace.list.constant';
import { IWorkspaceService } from '@api/modules/workspace/common/interfaces/workspace.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IWorkspaceUsersService } from '@api/modules/workspace/common/interfaces/workspace-users.service.interface';
import { USER_ROLE_SERVICE } from '@api/modules/user-role/common/constants/user-role.list.constant';
import { IUserRoleService } from '@api/modules/user-role/common/interfaces/user-role.service.interface';
import { UserRoleDocument } from '@api/modules/user-role/models/user-role.schema';
import { USER_SERVICE } from '@api/modules/user/common/constants/user.list.constant';
import { IUserService } from '@api/modules/user/common/interfaces/user.service.interface';
import { UserDocument } from '@api/modules/user/models/user.schema';

@Injectable()
export class WorkspaceSeed {
  constructor(
    @Inject(WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,

    @Inject(WORKSPACE_USERS_SERVICE)
    private readonly workspaceUserService: IWorkspaceUsersService,

    @Inject(USER_SERVICE)
    private readonly userService: IUserService,

    @Inject(USER_ROLE_SERVICE)
    private readonly roleService: IUserRoleService
  ) {}

  async insert(): Promise<void> {
    try {
      const superadminRole: UserRoleDocument = await this.roleService.findOne({
        name: 'superadmin',
      });
      console.log('Role', superadminRole);

      const workspace: WorkspaceDocument = await this.workspaceService.create({
        name: DEFAULT_ORGANIZATION_NAME,
        slug: DEFAULT_ORGANIZATION_NAME.toLowerCase(),
      });

      console.log('WOrkspace', workspace);

      const user: UserDocument = await this.userService.findOne({
        email: ADMIN_USER_EMAIL,
      });

      await this.workspaceUserService.create({
        userId: user._id,
        roleId: superadminRole._id,
        workspaceId: workspace._id,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }

  //   async remove(): Promise<void> {
  //     try {
  //     } catch (err: any) {
  //       throw new Error(err.message);
  //     }

  //     return;
  //   }
}
