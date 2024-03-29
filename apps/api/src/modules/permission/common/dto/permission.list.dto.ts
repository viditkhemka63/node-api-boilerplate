import { STATUS } from '@api/common/constants/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { PaginationListAbstract } from '@core/pagination/abstracts/pagination.abstract';
import {
  PaginationAvailableSearch,
  PaginationAvailableSort,
  PaginationFilterBoolean,
  PaginationPage,
  PaginationPerPage,
  PaginationSearch,
  PaginationSort,
  PaginationStatusFilter,
} from '@core/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '@core/pagination/interfaces/pagination.interface';
import {
  PERMISSION_DEFAULT_ACTIVE,
  PERMISSION_DEFAULT_AVAILABLE_SEARCH,
  PERMISSION_DEFAULT_AVAILABLE_SORT,
  PERMISSION_DEFAULT_PAGE,
  PERMISSION_DEFAULT_PER_PAGE,
  PERMISSION_DEFAULT_SORT,
} from '@api/modules/permission/common/constants/permission.list.constant';

export class PermissionListDto implements PaginationListAbstract {
  @PaginationSearch(PERMISSION_DEFAULT_AVAILABLE_SEARCH)
  readonly search: Record<string, any>;

  @ApiHideProperty()
  @PaginationAvailableSearch(PERMISSION_DEFAULT_AVAILABLE_SEARCH)
  readonly availableSearch: string[];

  @PaginationPage(PERMISSION_DEFAULT_PAGE)
  readonly page: number;

  @PaginationPerPage(PERMISSION_DEFAULT_PER_PAGE)
  readonly perPage: number;

  @PaginationSort(PERMISSION_DEFAULT_SORT, PERMISSION_DEFAULT_AVAILABLE_SORT)
  readonly sort: IPaginationSort;

  @ApiHideProperty()
  @PaginationAvailableSort(PERMISSION_DEFAULT_AVAILABLE_SORT)
  readonly availableSort: string[];

  @PaginationStatusFilter(STATUS['ACTIVE'])
  readonly status: string;
}
