import { PickType } from '@nestjs/swagger';
import { WorkspaceCreateDto } from '@api/modules/workspace/common/dto/workspace.create.dto';

export class WorkspaceUpdateDto extends PickType(WorkspaceCreateDto, [
  'name',
] as const) {}
