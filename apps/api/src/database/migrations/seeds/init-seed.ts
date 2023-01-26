import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PermissionSeed } from './permission.seed';
import { RoleSeed } from './role.seed';
import { UserSeed } from './user.seed';
import { WorkspaceSeed } from './workspace';

@Injectable()
export class InitSeedService implements OnModuleInit {
  constructor(
    private readonly permissionSeed: PermissionSeed,
    private readonly roleSeed: RoleSeed,
    private readonly userSeed: UserSeed,
    private readonly workspaceSeed: WorkspaceSeed,
    private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    console.log('Module Init called');
    console.log('Env: ', this.configService.get<string>('app.env'));
    if (this.configService.get<string>('app.env') == 'development') {
      // this.init().then(() => {
      //   console.info('Data Migrataed');
      // });
    }
  }

  async init() {
    await this.permissionSeed.insert();
    await this.roleSeed.insert();
    await this.userSeed.insert();
    await this.workspaceSeed.insert();
  }
}
