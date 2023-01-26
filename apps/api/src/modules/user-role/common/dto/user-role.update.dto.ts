import { PickType } from '@nestjs/swagger';
import { UserRoleCreateDto } from '@api/modules/user-role/common/dto/user-role.create.dto';

export class UserRoleUpdateDto extends PickType(UserRoleCreateDto, [
  'name',
] as const) {}
