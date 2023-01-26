import { UserRoleModule } from '@api/modules/user-role/user-role.module';
import { PermissionController } from '@api/modules/permission/controller/permission.controller';
import { PermissionModule } from '@api/modules/permission/permission.module';
import { Module } from '@nestjs/common';
import { UserRoleController } from '@api/modules/user-role/controllers/user-role.controller';
import { UserModule } from '@api/modules/user/user.module';
import { UserController } from '@api/modules/user/controllers/user.controller';
// import { WorkspaceModule } from '@api/modules/workspace/workspace.module';
// import { WorkspaceController } from '@api/modules/workspace/controllers/workspace.controller';
// import { WorkspaceTeamController } from '@api/modules/workspace/controllers/team.controller';

// import { AuthModule } from 'src/common/auth/auth.module';
// import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
// import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
// import { RoleModule } from 'src/modules/role/role.module';
// import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
// import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [
    // SettingAdminController,
    // UserAdminController,
    // RoleAdminController,
    PermissionController,
    UserRoleController,
    UserController,
  ],
  providers: [],
  exports: [],
  imports: [
    // UserModule, AuthModule, RoleModule,
    PermissionModule,
    UserRoleModule,
    UserModule,
  ],
})
export class RoutesAdminModule {}
