import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { HelperEncryptionService } from '@core/utils/helper/service/helper.encryption.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly helperEncryptionService: HelperEncryptionService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;
    const req: Request = ctx.getRequest();

    const token: string = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!token) {
      throw new HttpException('Unauthorized.', 401);
    }
    const user = this.helperEncryptionService.jwtVerify(token);
    if (!user) {
      throw new HttpException('Unauthorized.', 403);
    }

    req['user'] = user;

    return true;
  }
}
