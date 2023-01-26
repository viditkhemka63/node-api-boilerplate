import { faker } from '@faker-js/faker';

export const UserRoleDocQueryList = [
  {
    name: 'name',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.name.firstName(),
  },
  {
    name: 'permissions',
    allowEmptyValue: false,
    required: true,
    type: 'array',
    example: [faker.database.mongodbObjectId()],
  },
];

export const UserRoleDocParamsGet = [
  {
    name: 'id',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.database.mongodbObjectId(),
  },
];
