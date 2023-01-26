import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class UserRoleCreateDto {
  @ApiProperty({
    description: 'Alias name of permission',
    example: faker.name.jobDescriptor(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'Alias name of permission',
    example: [faker.database.mongodbObjectId()],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly permissions: string[];
}
