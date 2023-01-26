import { PartialType } from '@nestjs/swagger';
import { WorkspaceGetSerialization } from './workspace.get.serialization';

export class WorkspaceListSerialization extends PartialType(
  WorkspaceGetSerialization
) {}
