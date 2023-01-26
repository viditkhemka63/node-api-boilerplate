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
import { WORKSPACE_TEAM_USE_CASE } from '@api/modules/workspace/common/constants/workspace.list.constant';
import { WorkspaceDocument } from '@api/modules/workspace/schemas/workspace.schema';
import { ApiTags } from '@nestjs/swagger';
import { IWorkspaceTeamUseCase } from '../common/interfaces/team.use-case';
import { WorkspaceInvitationsCreateDto } from '../common/dto/workspace-invitations.create.dto';
import { User } from '@api/common/decorators/user.decorator';
import { WorkspaceUsersUpdateDto } from '../common/dto/workspace-users.update.dto';
import { WorkspaceUsersDocument } from '../schemas/workspace-users.schema';

const routeName = 'workspace-team';

// !TODO: have to add the docs decorator to all methods.
@ApiTags(routeName)
@Controller(routeName)
export class WorkspaceTeamController {
  constructor(
    @Inject(WORKSPACE_TEAM_USE_CASE)
    private readonly workspaceTeamUseCase: IWorkspaceTeamUseCase
  ) {}

  //   @WorkspaceListDoc()
  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async list(
    @Query()
    workspaceListDto: WorkspaceListDto
  ): Promise<IResponsePaging> {
    return this.workspaceTeamUseCase.listTeam(workspaceListDto);
  }

  //   @WorkspaceGetDoc()
  //   @Get(':id')
  //   async findById(@Param('id') id: string): Promise<WorkspaceDocument> {
  //     return this.workspaceTeamUseCase.findOneById(id);
  //   }

  //   @WorkspaceCreateDoc()
  @Post()
  async create(
    @Body() workspaceCreateDto: WorkspaceInvitationsCreateDto,
    @User('id') userId: string
  ): Promise<WorkspaceDocument> {
    return this.workspaceTeamUseCase.createInvitation(
      workspaceCreateDto,
      userId
    );
  }

  //   @WorkspaceUpdateDoc()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: WorkspaceUsersUpdateDto
  ): Promise<WorkspaceUsersDocument> {
    return await this.workspaceTeamUseCase.updateUserRole(id, body);
  }

  //   @WorkspaceDeleteDoc()
  @Delete(':id')
  delete(@Param('id') id: string) {
    // !TODO: have to check if we can pass the workspaceId in the payload
    // otherwise have to grab it from the header.
    return this.workspaceTeamUseCase.removeUserFromWorkspace(id, '');
  }
}
