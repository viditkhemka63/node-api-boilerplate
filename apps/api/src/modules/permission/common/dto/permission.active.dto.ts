import { STATUS } from '@api/common/constants/common';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class PermissionActiveDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly status: string;
}
