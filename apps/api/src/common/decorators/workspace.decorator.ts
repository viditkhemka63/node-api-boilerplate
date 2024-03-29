import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Workspace = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.headers['Workspace'];
  }
);
