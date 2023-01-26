import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RemoteAddress = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.socket.remoteAddress;
  },
);
