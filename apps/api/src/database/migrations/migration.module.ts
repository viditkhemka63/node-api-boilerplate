import { WorkspaceModule } from './../../modules/workspace/workspace.module';
import { AuthModule } from '@api/modules/auth/auth.module';
import { PermissionModule } from '@api/modules/permission/permission.module';
import { UserRoleModule } from '@api/modules/user-role/user-role.module';
import { UserModule } from '@api/modules/user/user.module';
import { Module } from '@nestjs/common';
import { InitSeedService } from './seeds/init-seed';
import { PermissionSeed } from './seeds/permission.seed';
import { RoleSeed } from './seeds/role.seed';
import { UserSeed } from './seeds/user.seed';

import { WorkspaceSeed } from './seeds/workspace';

@Module({
  imports: [
    PermissionModule,
    UserRoleModule,
    UserModule,
    AuthModule,
    WorkspaceModule,
  ],
  providers: [
    PermissionSeed,
    RoleSeed,
    UserSeed,
    InitSeedService,
    WorkspaceSeed,
  ],
  exports: [],
})
export class MigrationModule {}
