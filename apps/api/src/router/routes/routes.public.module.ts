import { AuthController } from '@api/modules/auth/auth.controller';
import { AuthModule } from '@api/modules/auth/auth.module';
import { Module } from '@nestjs/common';
// import { AuthModule } from 'src/common/auth/auth.module';
// import { PermissionModule } from 'src/modules/permission/permission.module';
// import { RoleModule } from 'src/modules/role/role.module';
// import { UserPublicController } from 'src/modules/user/controllers/user.public.controller';
// import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [
    // UserPublicController
    AuthController,
  ],
  providers: [],
  exports: [],
  imports: [
    // UserModule, AuthModule, RoleModule, PermissionModule
    AuthModule,
  ],
})
export class RoutesPublicModule {}
