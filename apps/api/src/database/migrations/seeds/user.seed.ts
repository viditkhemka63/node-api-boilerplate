import { AuthHelperService } from '@api/modules/auth/auth-helper.service';
import { USER_ROLE_SERVICE } from '@api/modules/user-role/common/constants/user-role.list.constant';
import { IUserRoleService } from '@api/modules/user-role/common/interfaces/user-role.service.interface';
import {
  USER_BULK_SERVICE,
  USER_SERVICE,
} from '@api/modules/user/common/constants/user.list.constant';
import { IUserBulkService } from '@api/modules/user/common/interfaces/user.bulk-service.interface';
import { IUserService } from '@api/modules/user/common/interfaces/user.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ADMIN_USER_EMAIL } from '@api/database/constants/database.constant';

@Injectable()
export class UserSeed {
  constructor(
    private readonly authHelperService: AuthHelperService,

    @Inject(USER_SERVICE)
    private readonly userService: IUserService,

    @Inject(USER_BULK_SERVICE)
    private readonly userBulkService: IUserBulkService,

    @Inject(USER_ROLE_SERVICE)
    private readonly roleService: IUserRoleService
  ) {}

  async insert(): Promise<void> {
    try {
      const password = await this.authHelperService.createPassword(
        'aaAA@@123444'
      );

      await this.userService.create({
        firstName: 'superadmin',
        lastName: 'test',
        email: ADMIN_USER_EMAIL,
        password: password.passwordHash,
        mobileNumber: '08111111222',
        salt: password.salt,
      });

      await this.userService.create({
        firstName: 'admin',
        lastName: 'test',
        email: 'admin@mail.com',
        password: password.passwordHash,
        mobileNumber: '08111111111',
        salt: password.salt,
      });

      await this.userService.create({
        firstName: 'user',
        lastName: 'test',
        email: 'user@mail.com',
        password: password.passwordHash,
        mobileNumber: '08111111333',
        salt: password.salt,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }

  async remove(): Promise<void> {
    try {
      await this.userBulkService.deleteMany({});
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }
}
