import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Post,
  Delete,
  Inject,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { WorkspaceListDto } from '@api/modules/workspace/common/dto/workspace.list.dto';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { WorkspaceUpdateDto } from '@api/modules/workspace/common/dto/workspace.update.dto';
import { WorkspaceCreateDto } from '@api/modules/workspace/common/dto/workspace.create.dto';
import {
  WorkspaceListDoc,
  WorkspaceUpdateDoc,
  WorkspaceGetDoc,
  WorkspaceCreateDoc,
  WorkspaceDeleteDoc,
} from '@api/modules/workspace/common/docs/workspace.doc';
import { WORKSPACE_SERVICE } from '@api/modules/workspace/common/constants/workspace.list.constant';
import { IWorkspaceService } from '@api/modules/workspace/common/interfaces/workspace.service.interface';
import { WorkspaceDocument } from '@api/modules/workspace/schemas/workspace.schema';
import { ApiTags } from '@nestjs/swagger';

const routeName = 'workspace';

@ApiTags(routeName)
@Controller(routeName)
export class WorkspaceController {
  constructor(
    @Inject(WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService
  ) {}

  @WorkspaceListDoc()
  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async list(
    @Query()
    workspaceListDto: WorkspaceListDto
  ): Promise<IResponsePaging> {
    return this.workspaceService.findAndCountAll(workspaceListDto);
  }

  @WorkspaceGetDoc()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<WorkspaceDocument> {
    return this.workspaceService.findOneById(id);
  }

  @WorkspaceCreateDoc()
  @Post()
  async create(
    @Body() workspaceCreateDto: WorkspaceCreateDto
  ): Promise<WorkspaceDocument> {
    return this.workspaceService.create(workspaceCreateDto);
  }

  @WorkspaceUpdateDoc()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: WorkspaceUpdateDto
  ): Promise<WorkspaceDocument> {
    return await this.workspaceService.update(id, body);
  }

  @WorkspaceDeleteDoc()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workspaceService.delete(id);
  }
}
