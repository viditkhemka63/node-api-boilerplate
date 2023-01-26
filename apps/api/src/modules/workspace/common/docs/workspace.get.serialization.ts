import { STATUS } from '@api/common/constants/common';
import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

export class WorkspaceGetSerialization {
  @ApiProperty({
    description: 'Id that representative with your target data',
    example: faker.database.mongodbObjectId(),
    required: true,
  })
  @Type(() => String)
  readonly _id: string;

  @ApiProperty({
    description: 'Active flag of permission',
    example: STATUS['ACTIVE'],
    required: true,
  })
  readonly status: boolean;

  @ApiProperty({
    description: 'Alias name of permission',
    example: faker.name.jobDescriptor(),
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Date created at',
    example: faker.date.recent(),
    required: true,
  })
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;

  @Exclude()
  readonly deletedAt: Date;
}
