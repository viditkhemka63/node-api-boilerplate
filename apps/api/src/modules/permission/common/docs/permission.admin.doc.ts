import { applyDecorators } from '@nestjs/common';
import { Doc, DocPaging } from '@api/common/decorators/doc.decorator';
import {
  PermissionDocParamsGet,
  PermissionDocQueryList,
} from '@api/modules/permission/common/constants/permission.doc.constant';
import {
  PERMISSION_DEFAULT_AVAILABLE_SEARCH,
  PERMISSION_DEFAULT_AVAILABLE_SORT,
} from '@api/modules/permission/common/constants/permission.list.constant';
import { PermissionGetSerialization } from './permission.get.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PermissionListSerialization } from './permission.list.serialization';

export class ResponseIdSerialization {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: '631d9f32a65cf07250b8938c',
    required: true,
  })
  @Type(() => String)
  _id: string;
}

export function PermissionListDoc(): any {
  return applyDecorators(
    DocPaging<PermissionListSerialization>('permission.list', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        queries: PermissionDocQueryList,
      },
      response: {
        classSerialization: PermissionListSerialization,
        availableSort: PERMISSION_DEFAULT_AVAILABLE_SORT,
        availableSearch: PERMISSION_DEFAULT_AVAILABLE_SEARCH,
      },
    })
  );
}

export function PermissionGetDoc(): any {
  return applyDecorators(
    Doc<PermissionGetSerialization>('permission.get', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      requestHeader: {
        userAgent: true,
        timestamp: true,
      },
      request: {
        params: PermissionDocParamsGet,
      },
      response: { classSerialization: PermissionGetSerialization },
    })
  );
}

export function PermissionUpdateDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('permission.update', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      requestHeader: {
        userAgent: true,
        timestamp: true,
      },
      request: {
        params: PermissionDocParamsGet,
      },
      response: { classSerialization: ResponseIdSerialization },
    })
  );
}

export function PermissionActiveDoc(): any {
  return applyDecorators(
    Doc<void>('permission.active', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      requestHeader: {
        userAgent: true,
        timestamp: true,
      },
      request: {
        params: PermissionDocParamsGet,
      },
    })
  );
}

export function PermissionInactiveDoc(): any {
  return applyDecorators(
    Doc<void>('permission.inactive', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      requestHeader: {
        userAgent: true,
        timestamp: true,
      },
      request: {
        params: PermissionDocParamsGet,
      },
    })
  );
}
