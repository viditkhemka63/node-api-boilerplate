import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthHelperService } from './auth-helper.service';
import { UserModule } from '@api/modules/user/user.module';
import { UserRoleModule } from '@api/modules/user-role/user-role.module';
// import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [UserModule, UserRoleModule],
  providers: [AuthService, AuthHelperService],
  exports: [AuthHelperService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
