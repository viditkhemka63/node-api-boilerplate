import { applyDecorators } from '@nestjs/common';
import { Doc, DocPaging } from '@api/common/decorators/doc.decorator';
import {
  UserDocParamsGet,
  UserDocQueryList,
} from '@api/modules/user/common/constants/user.doc.constant';
import {
  USER_DEFAULT_AVAILABLE_SORT,
  USER_DEFAULT_SORT,
} from '@api/modules/user/common/constants/user.list.constant';
import { UserGetSerialization } from './user.get.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserListSerialization } from './user.list.serialization';
import { USER_DEFAULT_AVAILABLE_SEARCH } from '../constants/user.list.constant';

export class ResponseIdSerialization {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: '631d9f32a65cf07250b8938c',
    required: true,
  })
  @Type(() => String)
  _id: string;
}

export function UserListDoc(): any {
  return applyDecorators(
    DocPaging<UserListSerialization>('user.list', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        queries: UserDocQueryList,
      },
      response: {
        classSerialization: UserListSerialization,
        availableSort: USER_DEFAULT_AVAILABLE_SORT,
        availableSearch: USER_DEFAULT_AVAILABLE_SEARCH,
      },
    })
  );
}

export function UserGetDoc(): any {
  return applyDecorators(
    Doc<UserGetSerialization>('user.get', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: UserDocParamsGet,
      },
      response: { classSerialization: UserGetSerialization },
    })
  );
}

export function UserCreateDoc(): any {
  return applyDecorators(
    Doc<UserGetSerialization>('user.post', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      request: {
        params: UserDocParamsGet,
      },
      response: { classSerialization: UserGetSerialization },
    })
  );
}

export function UserUpdateDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('user.put', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: UserDocParamsGet,
      },
      response: { classSerialization: ResponseIdSerialization },
    })
  );
}

export function UserDeleteDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('user.delete', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: UserDocParamsGet,
      },
      response: { classSerialization: UserGetSerialization },
    })
  );
}
