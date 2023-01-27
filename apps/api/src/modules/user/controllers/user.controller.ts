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
import { UserListDto } from '@api/modules/user/common/dto/user.list.dto';
import { IResponsePaging } from '@api/common/interfaces/response.interface';
import { UserUpdateDto } from '@api/modules/user/common/dto/user.update.dto';
import { UserCreateDto } from '@api/modules/user/common/dto/user.create.dto';
import {
  UserListDoc,
  UserUpdateDoc,
  UserGetDoc,
  UserCreateDoc,
  UserDeleteDoc,
} from '@api/modules/user/common/docs/user.doc';
import { USER_SERVICE } from '@api/modules/user/common/constants/user.list.constant';
import { IUserService } from '@api/modules/user/common/interfaces/user.service.interface';
import { UserDocument } from '@api/modules/user/models/user.schema';
import { ApiTags } from '@nestjs/swagger';

const routeName = 'user';

@ApiTags(routeName)
@Controller(routeName)
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService
  ) {}

  @UserListDoc()
  @Get('/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async list(
    @Query()
    userListDto: UserListDto
  ): Promise<IResponsePaging> {
    return this.userService.findAndCountAll(userListDto);
  }

  @UserGetDoc()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findOneById(id);
  }

  // @UserCreateDoc()
  // @Post()
  // async create(userCreateDto: UserCreateDto): Promise<UserDocument> {
  //   return this.userService.create(userCreateDto);
  // }

  @UserUpdateDoc()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateDto
  ): Promise<UserDocument> {
    return await this.userService.update(id, body);
  }

  @UserDeleteDoc()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
