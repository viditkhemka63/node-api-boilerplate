import { PickType } from '@nestjs/swagger';
import { PermissionCreateDto } from '@api/modules/permission/common/dto/permission.create.dto';

export class PermissionUpdateDto extends PickType(PermissionCreateDto, [
  'name',
  'description',
] as const) {}
