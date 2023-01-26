import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { Types } from 'mongoose';

export class WorkspaceUsersCreateDto {
  @ApiProperty({
    description: 'Workspace Id',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  readonly workspaceId: string;

  @ApiProperty({
    description: 'User Id',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string | Types.ObjectId;

  @ApiProperty({
    description: 'Role Id',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly roleId: string;
}
