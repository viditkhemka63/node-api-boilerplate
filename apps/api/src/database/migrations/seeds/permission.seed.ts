import { ENUM_AUTH_PERMISSIONS } from '@api/modules/auth/constants/auth.enum.permission.constant';
import { PERMISSION_BULK_SERVICE } from '@api/modules/permission/common/constants/permission.list.constant';
import { IPermissionBulkService } from '@api/modules/permission/common/interfaces/permission.bulk-service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PermissionSeed {
  constructor(
    @Inject(PERMISSION_BULK_SERVICE)
    private readonly permissionBulkService: IPermissionBulkService
  ) {}

  async insert(): Promise<void> {
    try {
      const permissions: any[] = Object.keys(ENUM_AUTH_PERMISSIONS).map(
        (val) => ({
          code: val,
          name: val.replace('_', ' '),
          description: `${val.replace('_', ' ')} description`,
        })
      );

      await this.permissionBulkService.createMany(permissions);
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }

  async remove(): Promise<void> {
    try {
      await this.permissionBulkService.deleteMany({});
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }
}
