import { applyDecorators } from '@nestjs/common';
import { Doc, DocPaging } from '@api/common/decorators/doc.decorator';
import {
  UserRoleDocParamsGet,
  UserRoleDocQueryList,
} from '@api/modules/user-role/common/constants/user-role.doc.constant';
import {
  USER_ROLE_DEFAULT_AVAILABLE_SORT,
  USER_ROLE_DEFAULT_SORT,
} from '@api/modules/user-role/common/constants/user-role.list.constant';
import { UserRoleGetSerialization } from './user-role.get.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserRoleListSerialization } from './user-role.list.serialization';
import { USER_ROLE_DEFAULT_AVAILABLE_SEARCH } from '../constants/user-role.list.constant';

export class ResponseIdSerialization {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: '631d9f32a65cf07250b8938c',
    required: true,
  })
  @Type(() => String)
  _id: string;
}

export function UserRoleListDoc(): any {
  return applyDecorators(
    DocPaging<UserRoleListSerialization>('user-role.list', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        queries: UserRoleDocQueryList,
      },
      response: {
        classSerialization: UserRoleListSerialization,
        availableSort: USER_ROLE_DEFAULT_AVAILABLE_SORT,
        availableSearch: USER_ROLE_DEFAULT_AVAILABLE_SEARCH,
      },
    })
  );
}

export function UserRoleGetDoc(): any {
  return applyDecorators(
    Doc<UserRoleGetSerialization>('user-role.get', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: UserRoleDocParamsGet,
      },
      response: { classSerialization: UserRoleGetSerialization },
    })
  );
}

export function UserRoleCreateDoc(): any {
  return applyDecorators(
    Doc<UserRoleGetSerialization>('user-role.post', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      request: {
        params: UserRoleDocQueryList,
      },
      response: { classSerialization: UserRoleGetSerialization },
    })
  );
}

export function UserRoleUpdateDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('user-role.put', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: UserRoleDocQueryList,
      },
      response: { classSerialization: ResponseIdSerialization },
    })
  );
}

export function UserRoleDeleteDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('user-role.delete', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: UserRoleDocParamsGet,
      },
      response: { classSerialization: UserRoleGetSerialization },
    })
  );
}
