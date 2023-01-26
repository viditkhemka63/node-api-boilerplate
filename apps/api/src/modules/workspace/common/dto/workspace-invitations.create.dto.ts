import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class WorkspaceInvitationsCreateDto {
  @ApiProperty({
    description: 'Role Id',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly roleId: string;

  @ApiProperty({
    description: 'Workspace Id',
    example: faker.datatype.uuid(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly workspaceId: string;

  @ApiProperty({
    description: 'Email of the invited user',
    example: faker.internet.email(),
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly to: string;
}
