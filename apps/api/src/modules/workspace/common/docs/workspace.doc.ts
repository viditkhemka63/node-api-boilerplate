import { applyDecorators } from '@nestjs/common';
import { Doc, DocPaging } from '@api/common/decorators/doc.decorator';
import {
  WorkspaceDocParamsGet,
  WorkspaceDocQueryList,
} from '@api/modules/workspace/common/constants/workspace.doc.constant';
import { WORKSPACE_DEFAULT_AVAILABLE_SORT } from '@api/modules/workspace/common/constants/workspace.list.constant';
import { WorkspaceGetSerialization } from './workspace.get.serialization';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { WorkspaceListSerialization } from './workspace.list.serialization';
import { WORKSPACE_DEFAULT_AVAILABLE_SEARCH } from '../constants/workspace.list.constant';

export class ResponseIdSerialization {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: '631d9f32a65cf07250b8938c',
    required: true,
  })
  @Type(() => String)
  _id: string;
}

export function WorkspaceListDoc(): any {
  return applyDecorators(
    DocPaging<WorkspaceListSerialization>('workspace.list', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        queries: WorkspaceDocQueryList,
      },
      response: {
        classSerialization: WorkspaceListSerialization,
        availableSort: WORKSPACE_DEFAULT_AVAILABLE_SORT,
        availableSearch: WORKSPACE_DEFAULT_AVAILABLE_SEARCH,
      },
    })
  );
}

export function WorkspaceGetDoc(): any {
  return applyDecorators(
    Doc<WorkspaceGetSerialization>('workspace.get', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: WorkspaceDocParamsGet,
      },
      response: { classSerialization: WorkspaceGetSerialization },
    })
  );
}

export function WorkspaceCreateDoc(): any {
  return applyDecorators(
    Doc<WorkspaceGetSerialization>('workspace.post', {
      auth: {
        jwtAccessToken: true,
        apiKey: true,
      },
      request: {
        params: WorkspaceDocParamsGet,
      },
      response: { classSerialization: WorkspaceGetSerialization },
    })
  );
}

export function WorkspaceUpdateDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('workspace.put', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: WorkspaceDocParamsGet,
      },
      response: { classSerialization: ResponseIdSerialization },
    })
  );
}

export function WorkspaceDeleteDoc(): any {
  return applyDecorators(
    Doc<ResponseIdSerialization>('workspace.delete', {
      auth: {
        jwtAccessToken: true,
      },
      request: {
        params: WorkspaceDocParamsGet,
      },
      response: { classSerialization: WorkspaceGetSerialization },
    })
  );
}
