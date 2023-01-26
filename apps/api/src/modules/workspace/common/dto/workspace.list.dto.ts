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
  WORKSPACE_DEFAULT_ACTIVE,
  WORKSPACE_DEFAULT_AVAILABLE_SEARCH,
  WORKSPACE_DEFAULT_AVAILABLE_SORT,
  WORKSPACE_DEFAULT_PAGE,
  WORKSPACE_DEFAULT_PER_PAGE,
  WORKSPACE_DEFAULT_SORT,
} from '@api/modules/workspace/common/constants/workspace.list.constant';

export class WorkspaceListDto implements PaginationListAbstract {
  @PaginationSearch(WORKSPACE_DEFAULT_AVAILABLE_SEARCH)
  readonly search: Record<string, any>;

  @ApiHideProperty()
  @PaginationAvailableSearch(WORKSPACE_DEFAULT_AVAILABLE_SEARCH)
  readonly availableSearch: string[];

  @PaginationPage(WORKSPACE_DEFAULT_PAGE)
  readonly page: number;

  @PaginationPerPage(WORKSPACE_DEFAULT_PER_PAGE)
  readonly perPage: number;

  @PaginationSort(WORKSPACE_DEFAULT_SORT, WORKSPACE_DEFAULT_AVAILABLE_SORT)
  readonly sort: IPaginationSort;

  @ApiHideProperty()
  @PaginationAvailableSort(WORKSPACE_DEFAULT_AVAILABLE_SORT)
  readonly availableSort: string[];

  @PaginationFilterBoolean(WORKSPACE_DEFAULT_ACTIVE)
  readonly isActive: boolean[];
}
