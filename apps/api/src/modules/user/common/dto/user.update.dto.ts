import { PickType } from '@nestjs/swagger';
import { UserCreateDto } from '@api/modules/user/common/dto/user.create.dto';

export class UserUpdateDto extends PickType(UserCreateDto, [
  'firstName',
  'lastName',
] as const) {}
