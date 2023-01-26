import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Patch,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionListDto } from '@api/modules/permission/common/dto/permission.list.dto';

import {
  IResponse,
  IResponsePaging,
} from '@api/common/interfaces/response.interface';
import { PermissionDocument } from '@api/modules/permission/schemas/permission.schema';
import { PermissionUpdateDto } from '@api/modules/permission/common/dto/permission.update.dto';
import {
  PermissionActiveDoc,
  PermissionInactiveDoc,
  PermissionUpdateDoc,
} from '@api/modules/permission/common/docs/permission.admin.doc';
import { PERMISSION_SERVICE } from '../common/constants/permission.list.constant';
import { IPermissionService } from '../common/interfaces/permission.service.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('permission')
export class PermissionController {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: IPermissionService
  ) {}

  // @PermissionListDoc()
  @ApiBearerAuth()
  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async list(
    @Query()
    permissionListDto: PermissionListDto
  ): Promise<IResponsePaging> {
    return this.permissionService.findAndCountAll(permissionListDto);
  }

  @PermissionUpdateDoc()
  @Put('/update/:permission')
  async update(
    permission: PermissionDocument,
    @Body() body: PermissionUpdateDto
  ): Promise<IResponse> {
    return await this.permissionService.update(permission._id, body);
  }

  @PermissionActiveDoc()
  @Patch('/update/:permission/inactive')
  async inactive(permission: PermissionDocument): Promise<void> {
    try {
      await this.permissionService.inactive(permission._id);
    } catch (err: any) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      });
    }

    return;
  }

  @PermissionInactiveDoc()
  @Patch('/update/:permission/active')
  async active(permission: PermissionDocument): Promise<void> {
    try {
      await this.permissionService.active(permission._id);
    } catch (err: any) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      });
    }

    return;
  }
}
