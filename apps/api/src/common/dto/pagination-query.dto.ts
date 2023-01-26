import { STATUS_LIST } from '@api/common/constants/user.constant';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { STATUS } from '../constants/user.constant';
import { SORT_ORDER, SORT_ORDER_LIST } from '@api/common/constants/common';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  limit = 10;

  @IsOptional()
  @IsNumber()
  page = 1;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @IsIn(SORT_ORDER_LIST)
  sortOrder: string = SORT_ORDER['DESC'];

  @IsOptional()
  @IsIn(STATUS_LIST)
  status: string = STATUS['ACTIVE'];
}
