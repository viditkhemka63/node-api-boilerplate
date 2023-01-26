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
} from '@core/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '@core/pagination/interfaces/pagination.interface';
import {
  USER_DEFAULT_ACTIVE,
  USER_DEFAULT_AVAILABLE_SEARCH,
  USER_DEFAULT_AVAILABLE_SORT,
  USER_DEFAULT_PAGE,
  USER_DEFAULT_PER_PAGE,
  USER_DEFAULT_SORT,
} from '@api/modules/user/common/constants/user.list.constant';

export class UserListDto implements PaginationListAbstract {
  @PaginationSearch(USER_DEFAULT_AVAILABLE_SEARCH)
  readonly search: Record<string, any>;

  @ApiHideProperty()
  @PaginationAvailableSearch(USER_DEFAULT_AVAILABLE_SEARCH)
  readonly availableSearch: string[];

  @PaginationPage(USER_DEFAULT_PAGE)
  readonly page: number;

  @PaginationPerPage(USER_DEFAULT_PER_PAGE)
  readonly perPage: number;

  @PaginationSort(USER_DEFAULT_SORT, USER_DEFAULT_AVAILABLE_SORT)
  readonly sort: IPaginationSort;

  @ApiHideProperty()
  @PaginationAvailableSort(USER_DEFAULT_AVAILABLE_SORT)
  readonly availableSort: string[];

  @PaginationFilterBoolean(USER_DEFAULT_ACTIVE)
  readonly isActive: boolean[];
}
