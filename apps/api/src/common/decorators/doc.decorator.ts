import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiHeaders,
  ApiParam,
  ApiProduces,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
  PickType,
} from '@nestjs/swagger';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../constants/auth.status-code.constant';
import {
  ENUM_DOC_REQUEST_BODY_TYPE,
  ENUM_DOC_RESPONSE_BODY_TYPE,
} from '../constants/doc.constant';
import {
  IDocDefaultOptions,
  IDocOfOptions,
  IDocOptions,
  IDocPagingOptions,
} from '../interfaces/doc.interface';
// import { ENUM_FILE_EXCEL_MIME } from 'src/common/file/constants/file.enum.constant';
// import { FileMultipleDto } from 'src/common/file/dtos/file.multiple.dto';
// import { FileSingleDto } from 'src/common/file/dtos/file.single.dto';
export class ResponseDefaultSerialization<T = Record<string, any>> {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    nullable: false,
    description: 'return specific status code for every endpoints',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    nullable: false,
    description: 'Message base on language',
    oneOf: [
      {
        type: 'string',
        example: 'message endpoint',
      },
      {
        type: 'object',
        example: {
          en: 'This is test endpoint.',
          id: 'Ini adalah endpoint test',
        },
      },
    ],
  })
  message: string | IMessage;

  @ApiProperty({
    name: 'metadata',
    nullable: true,
    description: 'Contain metadata about API',
    type: 'object',
    required: true,
    example: {
      languages: ['en'],
      timestamp: 1660190937231,
      timezone: 'Asia/Jakarta',
      requestId: '40c2f734-7247-472b-bc26-8eff6e669781',
      path: '/api/v1/test/hello',
      version: '1',
      repoVersion: '1.0.0',
    },
  })
  metadata?: Record<string, any>;

  data?: T;
}

export class ResponsePagingMetadataSerialization {
  nextPage?: string;
  previousPage?: string;
  firstPage?: string;
  lastPage?: string;
}

export class ResponsePagingSerialization<
  T = Record<string, any>
> extends PickType(ResponseDefaultSerialization, [
  'statusCode',
  'message',
] as const) {
  @ApiProperty({
    name: 'totalData',
    type: Number,
    nullable: false,
    description: 'return total data in database',
    example: 100,
  })
  readonly totalData: number;

  @ApiProperty({
    name: 'totalPage',
    type: Number,
    nullable: true,
    description: 'return total page, max 20',
    example: 20,
  })
  totalPage?: number;

  @ApiProperty({
    name: 'currentPage',
    type: Number,
    nullable: true,
    description: 'return current page',
    example: 2,
  })
  currentPage?: number;

  @ApiProperty({
    name: 'perPage',
    type: Number,
    nullable: true,
    description: 'return per page',
    example: 10,
  })
  perPage?: number;

  @ApiProperty({
    name: 'availableSearch',
    type: 'array',
    nullable: false,
    description:
      'Search will base on availableSearch with rule contains, and case insensitive',
  })
  availableSearch?: string[];

  @ApiProperty({
    name: 'availableSort',
    type: 'array',
    nullable: false,
    description: 'Sort will base on availableSort',
  })
  availableSort?: string[];

  @ApiProperty({
    name: 'metadata',
    nullable: true,
    description: 'Contain metadata about API',
    type: 'object',
    required: true,
    example: {
      languages: ['en'],
      timestamp: 1660190937231,
      timezone: 'Asia/Jakarta',
      requestId: '40c2f734-7247-472b-bc26-8eff6e669781',
      path: '/api/v1/test/hello',
      version: '1',
      repoVersion: '1.0.0',
      nextPage: `http://217.0.0.1/__path?perPage=10&page=3&search=abc`,
      previousPage: `http://217.0.0.1/__path?perPage=10&page=1&search=abc`,
      firstPage: `http://217.0.0.1/__path?perPage=10&page=1&search=abc`,
      lastPage: `http://217.0.0.1/__path?perPage=10&page=20&search=abc`,
    },
  })
  readonly metadata?: any & ResponsePagingMetadataSerialization;

  readonly data?: T[];
}

// import { ResponseDefaultSerialization } from 'src/common/response/serializations/response.default.serialization';
// import { ResponsePagingSerialization } from 'src/common/response/serializations/response.paging.serialization';
import { AppLanguage } from '../constants/app.constant';
import { Skip } from '@core/utils/request/validation/request.skip.validation';
import { IMessage } from '../interfaces/message.interface';

export function Doc<T>(messagePath: string, options?: IDocOptions<T>): any {
  const docs = [];
  const normDoc: IDocDefaultOptions = {
    httpStatus: options?.response?.httpStatus ?? HttpStatus.OK,
    messagePath,
    statusCode: options?.response?.statusCode,
  };

  if (!normDoc.statusCode) {
    normDoc.statusCode = normDoc.httpStatus;
  }

  if (options?.request?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.FORM_DATA) {
    docs.push(ApiConsumes('multipart/form-data'));

    if (options?.request?.file?.multiple) {
      docs.push(
        ApiBody({
          description: 'Multiple file',
        })
      );
    } else if (!options?.request?.file?.multiple) {
      docs.push(
        ApiBody({
          description: 'Single file',
        })
      );
    }
  } else if (options?.request?.bodyType === ENUM_DOC_REQUEST_BODY_TYPE.TEXT) {
    docs.push(ApiConsumes('text/plain'));
  } else {
    docs.push(ApiConsumes('application/json'));
  }

  //   if (options?.response?.bodyType === ENUM_DOC_RESPONSE_BODY_TYPE.FILE) {
  //     docs.push(ApiProduces(ENUM_FILE_EXCEL_MIME.XLSX));
  //   }
  if (options?.response?.bodyType === ENUM_DOC_RESPONSE_BODY_TYPE.TEXT) {
    docs.push(ApiProduces('text/plain'));
  } else {
    docs.push(ApiProduces('application/json'));
    if (options?.response?.classSerialization) {
      normDoc.serialization = options?.response?.classSerialization;
    }
  }
  docs.push(DocDefault(normDoc));

  if (options?.request?.params) {
    const params: any[] = options?.request?.params.map((param) =>
      ApiParam(param)
    );
    docs.push(...params);
  }

  if (options?.request?.queries) {
    const queries: any[] = options?.request?.queries.map((query) =>
      ApiQuery(query)
    );
    docs.push(...queries);
  }

  const oneOfUnauthorized: IDocOfOptions[] = [];
  const oneOfForbidden: IDocOfOptions[] = [];

  // auth
  const auths = [];
  if (options?.auth?.jwtRefreshToken) {
    auths.push(ApiBearerAuth('refreshToken'));
    oneOfUnauthorized.push({
      messagePath: 'auth.error.refreshTokenUnauthorized',
      statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_REFRESH_TOKEN_ERROR,
    });
  }

  if (options?.auth?.jwtAccessToken) {
    auths.push(ApiBearerAuth('token'));
    oneOfUnauthorized.push({
      messagePath: 'auth.error.accessTokenUnauthorized',
      statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
    });
    oneOfForbidden.push(
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PERMISSION_INVALID_ERROR,
        messagePath: 'auth.error.permissionForbidden',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_ACCESS_FOR_INVALID_ERROR,
        messagePath: 'auth.error.accessForForbidden',
      }
    );
  }

  if (options?.auth?.apiKey) {
    auths.push(ApiBearerAuth('apiKey'));
    oneOfUnauthorized.push(
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_NEEDED_ERROR,
        messagePath: 'auth.apiKey.error.keyNeeded',
      },
      {
        statusCode:
          ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_PREFIX_INVALID_ERROR,
        messagePath: 'auth.apiKey.error.prefixInvalid',
      },
      {
        statusCode:
          ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_SCHEMA_INVALID_ERROR,
        messagePath: 'auth.apiKey.error.schemaInvalid',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_NOT_FOUND_ERROR,
        messagePath: 'auth.apiKey.error.notFound',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INACTIVE_ERROR,
        messagePath: 'auth.apiKey.error.inactive',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INVALID_ERROR,
        messagePath: 'auth.apiKey.error.invalid',
      }
    );
  }

  // request headers
  const requestHeaders = [];
  if (options?.requestHeader?.userAgent) {
    oneOfForbidden.push(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        messagePath: 'request.error.userAgentInvalid',
      },
      {
        statusCode: HttpStatus.BAD_REQUEST,
        messagePath: 'request.error.userAgentBrowserInvalid',
      },
      {
        statusCode: HttpStatus.BAD_REQUEST,
        messagePath: 'request.error.userAgentOsInvalid',
      }
    );
    requestHeaders.push({
      name: 'user-agent',
      description: 'User agent header',
      required: true,
      schema: {
        example:
          'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion',
        type: 'string',
      },
    });
  }

  //   if (options?.requestHeader?.timestamp) {
  //     oneOfForbidden.push({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       messagePath: 'request.error.timestampInvalid',
  //     });
  //     requestHeaders.push({
  //       name: 'x-timestamp',
  //       description: 'Timestamp header, in microseconds',
  //       required: true,
  //       schema: {
  //         example: 1662876305642,
  //         type: 'number',
  //       },
  //     });
  //   }

  return applyDecorators(
    // ApiHeader({
    //   name: 'x-custom-lang',
    //   description: 'Custom language header',
    //   required: false,
    //   schema: {
    //     default: AppLanguage,
    //     example: AppLanguage,
    //     type: 'string',
    //   },
    // }),
    ApiHeaders(requestHeaders),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      messagePath: 'http.serverError.serviceUnavailable',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      messagePath: 'http.serverError.internalServerError',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      messagePath: 'http.serverError.requestTimeout',
      statusCode: HttpStatus.REQUEST_TIMEOUT,
    }),
    oneOfForbidden.length > 0
      ? DocOneOf(HttpStatus.FORBIDDEN, ...oneOfForbidden)
      : Skip(),
    oneOfUnauthorized.length > 0
      ? DocOneOf(HttpStatus.UNAUTHORIZED, ...oneOfUnauthorized)
      : Skip(),
    ...auths,
    ...docs
  );
}

export function DocPaging<T>(
  messagePath: string,
  options?: IDocPagingOptions<T>
): any {
  // paging
  const docs = [];

  if (options?.request?.params) {
    const params: any[] = options?.request?.params.map((param) =>
      ApiParam(param)
    );
    docs.push(...params);
  }

  if (options?.request?.queries) {
    const queries: any[] = options?.request?.queries.map((query: any) =>
      ApiQuery({
        ...query,
        required: false,
      })
    );
    docs.push(...queries);
  }

  const oneOfUnauthorized: IDocOfOptions[] = [];
  const oneOfForbidden: IDocOfOptions[] = [];

  // auth
  const auths = [];
  if (options?.auth?.jwtRefreshToken) {
    auths.push(ApiBearerAuth('refreshToken'));
    oneOfUnauthorized.push({
      messagePath: 'auth.error.refreshTokenUnauthorized',
      statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_REFRESH_TOKEN_ERROR,
    });
  }

  if (options?.auth?.jwtAccessToken) {
    auths.push(ApiBearerAuth('token'));
    oneOfUnauthorized.push({
      messagePath: 'auth.error.accessTokenUnauthorized',
      statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
    });
    oneOfForbidden.push(
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_PERMISSION_INVALID_ERROR,
        messagePath: 'auth.error.permissionForbidden',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_ACCESS_FOR_INVALID_ERROR,
        messagePath: 'auth.error.accessForForbidden',
      }
    );
  }

  if (options?.auth?.apiKey) {
    auths.push(ApiBearerAuth('apiKey'));
    oneOfUnauthorized.push(
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_NEEDED_ERROR,
        messagePath: 'auth.apiKey.error.keyNeeded',
      },
      {
        statusCode:
          ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_PREFIX_INVALID_ERROR,
        messagePath: 'auth.apiKey.error.prefixInvalid',
      },
      {
        statusCode:
          ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_SCHEMA_INVALID_ERROR,
        messagePath: 'auth.apiKey.error.schemaInvalid',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_NOT_FOUND_ERROR,
        messagePath: 'auth.apiKey.error.notFound',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INACTIVE_ERROR,
        messagePath: 'auth.apiKey.error.inactive',
      },
      {
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_API_KEY_INVALID_ERROR,
        messagePath: 'auth.apiKey.error.invalid',
      }
    );
  }

  // request headers
  const requestHeaders = [];
  if (options?.requestHeader?.userAgent) {
    oneOfForbidden.push(
      {
        statusCode: HttpStatus.FORBIDDEN,
        messagePath: 'request.error.userAgentInvalid',
      },
      {
        statusCode: HttpStatus.FORBIDDEN,
        messagePath: 'request.error.userAgentBrowserInvalid',
      },
      {
        statusCode: HttpStatus.FORBIDDEN,
        messagePath: 'request.error.userAgentOsInvalid',
      }
    );
    requestHeaders.push({
      name: 'user-agent',
      description: 'User agent header',
      required: true,
      schema: {
        example:
          'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion',
        type: 'string',
      },
    });
  }

  if (options?.requestHeader?.timestamp) {
    oneOfForbidden.push({
      statusCode: HttpStatus.FORBIDDEN,
      messagePath: 'request.error.timestampInvalid',
    });
    requestHeaders.push({
      name: 'x-timestamp',
      description: 'Timestamp header, in microseconds',
      required: true,
      schema: {
        example: 1662876305642,
        type: 'number',
      },
    });
  }

  return applyDecorators(
    // paging
    ApiConsumes('application/json'),
    ApiExtraModels(ResponsePagingSerialization<T>),
    ApiExtraModels(options.response.classSerialization),
    ApiResponse({
      status: HttpStatus.OK,
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponsePagingSerialization<T>) }],
        properties: {
          message: {
            example: messagePath,
          },
          statusCode: {
            type: 'number',
            example: options.response.statusCode ?? HttpStatus.OK,
          },
          data: {
            type: 'array',
            items: {
              $ref: getSchemaPath(options.response.classSerialization),
            },
          },
          availableSearch: {
            example: options.response.availableSearch,
          },
          availableSort: {
            example: options.response.availableSort,
          },
        },
      },
    }),
    ApiQuery({
      name: 'search',
      required: false,
      allowEmptyValue: true,
      type: 'string',
      description:
        'Search will base on availableSearch with rule contains, and case insensitive',
    }),
    ApiQuery({
      name: 'perPage',
      required: true,
      allowEmptyValue: false,
      example: 20,
      type: 'number',
      description: 'Data per page',
    }),
    ApiQuery({
      name: 'page',
      required: true,
      allowEmptyValue: false,
      example: 1,
      type: 'number',
      description: 'page number',
    }),
    ApiQuery({
      name: 'sort',
      required: true,
      allowEmptyValue: false,
      example: 'createdAt@desc',
      type: 'string',
      description: 'Sort base on availableSort, type is `asc` and `desc`',
    }),

    // default
    // ApiHeader({
    //   name: 'x-custom-lang',
    //   description: 'Custom language header',
    //   required: false,
    //   schema: {
    //     default: AppLanguage,
    //     example: AppLanguage,
    //     type: 'string',
    //   },
    // }),
    ApiHeaders(requestHeaders),
    DocDefault({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      messagePath: 'http.serverError.serviceUnavailable',
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    }),
    DocDefault({
      httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      messagePath: 'http.serverError.internalServerError',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    DocDefault({
      httpStatus: HttpStatus.REQUEST_TIMEOUT,
      messagePath: 'http.serverError.requestTimeout',
      statusCode: HttpStatus.REQUEST_TIMEOUT,
    }),
    oneOfForbidden.length > 0
      ? DocOneOf(HttpStatus.FORBIDDEN, ...oneOfForbidden)
      : Skip(),
    oneOfUnauthorized.length > 0
      ? DocOneOf(HttpStatus.UNAUTHORIZED, ...oneOfUnauthorized)
      : Skip(),
    ...auths,
    ...docs
  );
}

export function DocDefault<T>(options: IDocDefaultOptions): any {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
    properties: {
      message: {
        example: options.messagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };

  if (options.serialization) {
    docs.push(ApiExtraModels(options.serialization));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.serialization),
      },
    };
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs
  );
}

export function DocOneOf<T>(
  httpStatus: HttpStatus,
  ...documents: IDocOfOptions[]
): any {
  const docs = [];
  const oneOf = [];

  for (const doc of documents) {
    const oneOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode || HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      oneOfSchema.properties = {
        ...oneOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    oneOf.push(oneOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        oneOf,
      },
    }),
    ...docs
  );
}

export function DocAnyOf<T>(
  httpStatus: HttpStatus,
  ...documents: IDocOfOptions[]
): any {
  const docs = [];
  const anyOf = [];

  for (const doc of documents) {
    const anyOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode || HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      anyOfSchema.properties = {
        ...anyOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    anyOf.push(anyOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        anyOf,
      },
    }),
    ...docs
  );
}

export function DocAllOf<T>(
  httpStatus: HttpStatus,
  ...documents: IDocOfOptions[]
): any {
  const docs = [];
  const allOf = [];

  for (const doc of documents) {
    const allOfSchema: Record<string, any> = {
      allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
      properties: {
        message: {
          example: doc.messagePath,
        },
        statusCode: {
          type: 'number',
          example: doc.statusCode || HttpStatus.OK,
        },
      },
    };

    if (doc.serialization) {
      docs.push(ApiExtraModels(doc.serialization));
      allOfSchema.properties = {
        ...allOfSchema.properties,
        data: {
          $ref: getSchemaPath(doc.serialization),
        },
      };
    }

    allOf.push(allOfSchema);
  }

  return applyDecorators(
    ApiExtraModels(ResponseDefaultSerialization<T>),
    ApiResponse({
      status: httpStatus,
      schema: {
        allOf,
      },
    }),
    ...docs
  );
}
