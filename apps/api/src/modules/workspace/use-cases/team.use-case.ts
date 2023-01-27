import { DEFAULT_PASSWORD } from './../../../common/constants/common';
import { WorkspaceDocument } from './../schemas/workspace.schema';
import { WorkspaceInvitationsDocument } from '@api/modules/workspace/schemas/workspace-invitations.schema';
import { MailerService } from '@libs/mailer/src/lib/mailer.service';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MAILER_SERVICE } from '@libs/mailer/src/lib/constants';
import mongoose, { ClientSession } from 'mongoose';
import {
  WORKSPACE_INVITATIONS_SERVICE,
  WORKSPACE_SERVICE,
  WORKSPACE_USERS_SERVICE,
} from '../common/constants/workspace.list.constant';
import { WorkspaceUsersUpdateDto } from '../common/dto/workspace-users.update.dto';
import { IWorkspaceInvitationsService } from '../common/interfaces/workspace-invitations.service.interface';
import { IWorkspaceUsersService } from '../common/interfaces/workspace-users.service.interface';
import { WorkspaceUsersDocument } from '../schemas/workspace-users.schema';
import { WorkspaceInvitationsCreateDto } from '../common/dto/workspace-invitations.create.dto';
import { IWorkspaceService } from '../common/interfaces/workspace.service.interface';
import { USER_SERVICE } from '@api/modules/user/common/constants/user.list.constant';
import { IUserService } from '@api/modules/user/common/interfaces/user.service.interface';
import { UserDocument } from '@api/modules/user/models/user.schema';
import { INVITATION_STATUS } from '@api/common/constants/common';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from '@core/utils/helper/service/helper.hash.service';
import { IWorkspaceTeamUseCase } from '../common/interfaces/team.use-case';

// !TODO: add transaction to all the queries.
@Injectable()
export class WorkspaceTeamUseCase implements IWorkspaceTeamUseCase {
  constructor(
    @Inject(WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,

    @Inject(WORKSPACE_USERS_SERVICE)
    private readonly workspaceUserService: IWorkspaceUsersService,

    @Inject(WORKSPACE_INVITATIONS_SERVICE)
    private readonly workspaceInvitationService: IWorkspaceInvitationsService,

    @Inject(USER_SERVICE)
    private readonly userService: IUserService,

    @Inject(MAILER_SERVICE)
    private readonly mailerService: MailerService,

    private readonly configService: ConfigService,
    private readonly helperHashService: HelperHashService
  ) {}

  /*
    Create the invitation by adding entry to the 
    workspace invitation collection with status pending.
  */
  async createInvitation(
    data: WorkspaceInvitationsCreateDto,
    invitedBy: string
  ) {
    const session: ClientSession = await mongoose.startSession();

    session.withTransaction(async () => {
      // check if invitaion is alreay created
      // if have then sent the mail only

      const { workspaceId, roleId, to } = data;

      const workspaceInvitaion: WorkspaceInvitationsDocument | undefined =
        await this.workspaceInvitationService.findOne(
          {
            workspaceId,
            roleId,
            to,
          },
          {
            session,
          }
        );

      if (!workspaceInvitaion) {
        await this.workspaceInvitationService.create(
          {
            ...data,
          },
          {
            session,
          }
        );
      } else {
        //TODO:  Update the token
      }

      // check the user already exists to whom we are sending email
      const userObj: UserDocument | undefined = await this.userService.findOne(
        {
          email: to,
        },
        { session }
      );

      if (!userObj) {
        // create user
        const saltLength: number = this.configService.get<number>(
          'auth.password.saltLength'
        );
        const salt: string = this.helperHashService.randomSalt(saltLength);

        const passwordHash = this.helperHashService.bcrypt(
          DEFAULT_PASSWORD,
          salt
        );

        await this.userService.create(
          {
            firstName: null,
            lastName: null,
            mobileNumber: null,

            email: to,
            password: passwordHash,
            salt,
          },
          { session }
        );
      }

      const workspace: WorkspaceDocument =
        await this.workspaceService.findOneById(workspaceId, { session });

      const user: UserDocument = await this.userService.findOneById(invitedBy, {
        session,
      });

      this.mailerService.sendInvitation(to, {
        workspaceName: workspace.name,
        senderName: user.firstName,
        link: '',
      });
    });
  }

  // ?Ques: how to handle invitation for the users already exists?
  /*
    Update the invitation status from pending to accepted
    and create the user if not already exists
    and update the WorkspaceUsers table.
  */
  async acceptInvitation(invitationId: string, acceptedById: string) {
    // !TODO: Create a custom decorator for transaction.
    const session: ClientSession = await mongoose.startSession();

    session.withTransaction(async () => {
      const invitedUser: WorkspaceInvitationsDocument =
        await this.workspaceInvitationService.findOneById(invitationId, {
          session,
        });

      // the status of the invited user should be pending..
      if (invitedUser.status !== INVITATION_STATUS['PENDING']) {
        throw new HttpException('409', HttpStatus.CONFLICT);
      }

      //TODO: validatate if the token is not expired

      const acceptedInviation: any =
        await this.workspaceInvitationService.acceptInvitation(invitationId);

      await this.workspaceUserService.create({
        workspaceId: acceptedInviation.workspaceId,
        userId: acceptedById,
        roleId: acceptedInviation.roleId,
      });
    });
  }

  /*
    Soft delete the user via userId from the WorkspaceUsers table
  */
  async removeUserFromWorkspace(
    userId: string,
    workspaceId: string
  ): Promise<WorkspaceUsersDocument> {
    // !TODO: before removing check if the current user is authorized to do that
    return this.workspaceUserService.deleteOne({
      userId,
      workspaceId,
    });
  }

  // Update the role of the user in a team.
  /*
    Update the role using userId, WorkspaceId and new RoleId
  */
  updateUserRole(
    id: string,
    data: WorkspaceUsersUpdateDto
  ): Promise<WorkspaceUsersDocument> {
    // !TODO: before updating check if the current user is authorized to do that
    return this.workspaceUserService.update(id, data);
  }

  /*
    List the team with workspaceId filter and then 
    populate the user and role object in while fetching
  */
  async listTeam(query: any): Promise<IResponsePaging> {
    return this.workspaceUserService.findAndCountAll(query);
  }
}
