import { faker } from '@faker-js/faker';

export const UserDocQueryList = [
  {
    name: 'isActive',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: 'true,false',
    description: "boolean value with ',' delimiter",
  },
];

export const UserDocParamsGet = [
  {
    name: 'id',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.database.mongodbObjectId(),
  },
];
