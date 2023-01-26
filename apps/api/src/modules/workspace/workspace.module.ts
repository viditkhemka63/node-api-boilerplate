import { Module } from '@nestjs/common';
import { WorkspaceService } from './services/workspace.service';
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceRepository } from './services/workspace.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WorkspaceDatabaseName,
  WorkspaceEntity,
  WorkspaceSchema,
} from './schemas/workspace.schema';
import {
  WORKSPACE_INVITATIONS_SERVICE,
  WORKSPACE_SERVICE,
  WORKSPACE_TEAM_USE_CASE,
  WORKSPACE_USERS_SERVICE,
} from '@api/modules/workspace/common/constants/workspace.list.constant';
import { WorkspaceUsersRepository } from './services/workspace-users.repository';
import { WorkspaceUsersService } from './services/workspace-users.service';
import { WorkspaceInvitationsRepository } from './services/workspace-invitations.repository';
import { WorkspaceInvitationsService } from './services/workspace-invitations.service';
import { WorkspaceTeamUseCase } from './use-cases/team.use-case';
import {
  WorkspaceUsersDatabaseName,
  WorkspaceUsersEntity,
  WorkspaceUsersSchema,
} from './schemas/workspace-users.schema';
import {
  WorkspaceInvitationsDatabaseName,
  WorkspaceInvitationsEntity,
  WorkspaceInvitationsSchema,
} from './schemas/workspace-invitations.schema';
import { MailerModule } from '@libs/mailer/src/lib/mailer.module';

import { UserModule } from '../user/user.module';
import { WorkspaceTeamController } from './controllers/team.controller';

@Module({
  providers: [
    WorkspaceRepository,
    WorkspaceUsersRepository,
    WorkspaceInvitationsRepository,
    {
      provide: WORKSPACE_SERVICE,
      useClass: WorkspaceService,
    },
    {
      provide: WORKSPACE_USERS_SERVICE,
      useClass: WorkspaceUsersService,
    },
    {
      provide: WORKSPACE_INVITATIONS_SERVICE,
      useClass: WorkspaceInvitationsService,
    },
    {
      provide: WORKSPACE_TEAM_USE_CASE,
      useClass: WorkspaceTeamUseCase,
    },
    {
      provide: WORKSPACE_TEAM_USE_CASE,
      useClass: WorkspaceTeamUseCase,
    },
  ],
  exports: [
    {
      provide: WORKSPACE_SERVICE,
      useClass: WorkspaceService,
    },
    {
      provide: WORKSPACE_USERS_SERVICE,
      useClass: WorkspaceUsersService,
    },
    {
      provide: WORKSPACE_INVITATIONS_SERVICE,
      useClass: WorkspaceInvitationsService,
    },
    {
      provide: WORKSPACE_TEAM_USE_CASE,
      useClass: WorkspaceTeamUseCase,
    },
  ],
  controllers: [WorkspaceController, WorkspaceTeamController],
  imports: [
    UserModule,
    MailerModule,
    MongooseModule.forFeature([
      {
        name: WorkspaceEntity.name,
        schema: WorkspaceSchema,
        collection: WorkspaceDatabaseName,
      },
      {
        name: WorkspaceUsersEntity.name,
        schema: WorkspaceUsersSchema,
        collection: WorkspaceUsersDatabaseName,
      },
      {
        name: WorkspaceInvitationsEntity.name,
        schema: WorkspaceInvitationsSchema,
        collection: WorkspaceInvitationsDatabaseName,
      },
    ]),
  ],
})
export class WorkspaceModule {}
