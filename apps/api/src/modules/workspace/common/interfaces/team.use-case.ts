import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { WorkspaceUsersDocument } from '../../schemas/workspace-users.schema';
import { WorkspaceInvitationsCreateDto } from '../dto/workspace-invitations.create.dto';
import { WorkspaceUsersUpdateDto } from '../dto/workspace-users.update.dto';

export interface IWorkspaceTeamUseCase {
  createInvitation(data: WorkspaceInvitationsCreateDto, invitedBy: string);

  acceptInvitation(invitationId: string, acceptedById: string);

  removeUserFromWorkspace(
    userId: string,
    workspaceId: string
  ): Promise<WorkspaceUsersDocument>;

  updateUserRole(
    id: string,
    data: WorkspaceUsersUpdateDto
  ): Promise<WorkspaceUsersDocument>;

  listTeam(query: any): Promise<IResponsePaging>;
}
