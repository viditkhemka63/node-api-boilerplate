import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class WorkspaceCreateDto {
  @ApiProperty({
    description: 'Workspace name',
    example: faker.name.jobDescriptor(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly slug: string;
}
