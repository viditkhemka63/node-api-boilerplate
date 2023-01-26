import { PickType } from '@nestjs/swagger';
import { WorkspaceUsersCreateDto } from './workspace-users.create.dto';

export class WorkspaceUsersUpdateDto extends PickType(WorkspaceUsersCreateDto, [
  'workspaceId',
] as const) {}
