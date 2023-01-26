// import { WorkspaceUsersDocument } from './../../modules/workspace/schemas/workspace-users.schema';
// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   Inject,
//   Injectable,
// } from '@nestjs/common';
// import { HttpArgumentsHost } from '@nestjs/common/interfaces';
// import { Request } from 'express';
// import { Reflector } from '@nestjs/core';
// import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
// import { WORKSPACE_USERS_SERVICE } from '@api/modules/workspace/common/constants/workspace.list.constant';
// import { IWorkspaceUsersService } from '@api/modules/workspace/common/interfaces/workspace-users.service.interface';
// import { get } from 'lodash';
// import { mongo } from 'mongoose';

// @Injectable()
// export class WorkspaceGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,

//     @Inject(WORKSPACE_USERS_SERVICE)
//     private readonly workspaceUserService: IWorkspaceUsersService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx: HttpArgumentsHost = context.switchToHttp();
//     const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

//     if (isPublic) return true;

//     const req: Request = ctx.getRequest();

//     const workspaceHeader: string | string[] = req.headers['workspace'];
//     const userId: string = get(req, 'user.user._id');
//     const workspaceId: string = get(req, 'user.user.workspace.workspaceId._id');

//     const workspaceUser: WorkspaceUsersDocument =
//       await this.workspaceUserService.findOne(
//         {
//           workspaceId: new mongo.ObjectId(workspaceId),
//           userId: new mongo.ObjectId(userId),
//         },
//         { populate: true }
//       );
//     const workspaceSlug: string = get(workspaceUser, 'workspaceId.slug');

//     if (workspaceSlug !== workspaceHeader) {
//       throw new HttpException('Invalid workspace.', 403);
//     }

//     return true;
//   }
// }
