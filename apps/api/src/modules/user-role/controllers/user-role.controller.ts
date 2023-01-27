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
import { UserRoleListDto } from '@api/modules/user-role/common/dto/user-role.list.dto';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { UserRoleUpdateDto } from '@api/modules/user-role/common/dto/user-role.update.dto';
import { UserRoleCreateDto } from '@api/modules/user-role/common/dto/user-role.create.dto';
import {
  UserRoleListDoc,
  UserRoleUpdateDoc,
  UserRoleGetDoc,
  UserRoleCreateDoc,
  UserRoleDeleteDoc,
} from '@api/modules/user-role/common/docs/user-role.doc';
import { USER_ROLE_SERVICE } from '@api/modules/user-role/common/constants/user-role.list.constant';
import { IUserRoleService } from '@api/modules/user-role/common/interfaces/user-role.service.interface';
import { UserRoleDocument } from '@api/modules/user-role/models/user-role.schema';
import { ApiTags } from '@nestjs/swagger';

const routeName = 'user-role';

@ApiTags(routeName)
@Controller(routeName)
export class UserRoleController {
  constructor(
    @Inject(USER_ROLE_SERVICE)
    private readonly userRoleService: IUserRoleService
  ) {}

  @UserRoleListDoc()
  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async list(
    @Query()
    userRoleListDto: UserRoleListDto
  ): Promise<IResponsePaging> {
    return this.userRoleService.findAndCountAll(userRoleListDto);
  }

  @UserRoleGetDoc()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserRoleDocument> {
    return this.userRoleService.findOneById(id);
  }

  @UserRoleCreateDoc()
  @Post()
  async create(
    @Body() userRoleCreateDto: UserRoleCreateDto
  ): Promise<UserRoleDocument> {
    return this.userRoleService.create(userRoleCreateDto);
  }

  @UserRoleUpdateDoc()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UserRoleUpdateDto
  ): Promise<UserRoleDocument> {
    return await this.userRoleService.update(id, body);
  }

  @UserRoleDeleteDoc()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userRoleService.delete(id);
  }
}
