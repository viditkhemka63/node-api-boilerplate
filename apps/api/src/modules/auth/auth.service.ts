import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from '@api/modules/auth/dto/register.dto';
import { AuthHelperService } from '@api/modules/auth/auth-helper.service';

import { IUserService } from '@api/modules/user/common/interfaces/user.service.interface';
import { USER_SERVICE } from '@api/modules/user/common/constants/user.list.constant';
// import { WORKSPACE_USERS_SERVICE } from '../workspace/common/constants/workspace.list.constant';
// import { IWorkspaceUsersService } from '../workspace/common/interfaces/workspace-users.service.interface';
// import { WorkspaceUsersDocument } from '../workspace/schemas/workspace-users.schema';

const ip = '1234';
const ua = '1233';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,

    // @Inject(WORKSPACE_USERS_SERVICE)
    // private readonly workspaceUserService: IWorkspaceUsersService,

    private readonly authHelpers: AuthHelperService,
    private readonly configService: ConfigService
  ) {}

  async login({ email, password }: any) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new HttpException('Invalid Credentials', 401);
    }

    return {
      statusCode: HttpStatus.ACCEPTED,
      ...this.authHelpers.getTokens(user, ip, ua),
      user: user,
    };
  }

  async register(data: RegisterDto) {
    const { password } = data;

    const { passwordHash, salt } = await this.authHelpers.createPassword(
      password
    );

    const createdUser = await this.userService.create({
      ...data,
      salt,
      password: passwordHash,
      mobileNumber: null,
    });

    return {
      statusCode: HttpStatus.ACCEPTED,
      ...this.authHelpers.getTokens(createdUser, ip, ua),
      user: createdUser,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid: boolean = await this.authHelpers.validatePassword(
      password,
      user.password
    );
    if (isPasswordValid) {
      user.password = null;
      // const userWorkspace: WorkspaceUsersDocument =
      //   await this.workspaceUserService.findOne(
      //     {
      //       userId: user._id,
      //     },
      //     {
      //       populate: true,
      //     }
      //   );

      return {
        ...user,
        // workspace: userWorkspace,
      };
    }

    return null;
  }
}
