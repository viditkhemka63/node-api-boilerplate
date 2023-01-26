import { ApiHideProperty } from '@nestjs/swagger';
import { PaginationListAbstract } from '@core/pagination/abstracts/pagination.abstract';
import {
  PaginationAvailableSearch,
  PaginationAvailableSort,
  PaginationPage,
  PaginationPerPage,
  PaginationSearch,
  PaginationSort,
} from '@core/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '@core/pagination/interfaces/pagination.interface';
import {
  USER_ROLE_DEFAULT_AVAILABLE_SEARCH,
  USER_ROLE_DEFAULT_AVAILABLE_SORT,
  USER_ROLE_DEFAULT_PAGE,
  USER_ROLE_DEFAULT_PER_PAGE,
  USER_ROLE_DEFAULT_SORT,
} from '@api/modules/user-role/common/constants/user-role.list.constant';

export class UserRoleListDto implements PaginationListAbstract {
  @PaginationSearch(USER_ROLE_DEFAULT_AVAILABLE_SEARCH)
  readonly search: Record<string, any>;

  @ApiHideProperty()
  @PaginationAvailableSearch(USER_ROLE_DEFAULT_AVAILABLE_SEARCH)
  readonly availableSearch: string[];

  @PaginationPage(USER_ROLE_DEFAULT_PAGE)
  readonly page: number;

  @PaginationPerPage(USER_ROLE_DEFAULT_PER_PAGE)
  readonly perPage: number;

  @PaginationSort(USER_ROLE_DEFAULT_SORT, USER_ROLE_DEFAULT_AVAILABLE_SORT)
  readonly sort: IPaginationSort;

  @ApiHideProperty()
  @PaginationAvailableSort(USER_ROLE_DEFAULT_AVAILABLE_SORT)
  readonly availableSort: string[];

  // @PaginationFilterBoolean(USER_ROLE_DEFAULT_ACTIVE)
  readonly status: string;
}
