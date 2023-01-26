import { faker } from '@faker-js/faker';

export const WorkspaceDocQueryList = [
  {
    name: 'isActive',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: 'true,false',
    description: "boolean value with ',' delimiter",
  },
];

export const WorkspaceDocParamsGet = [
  {
    name: 'id',
    allowEmptyValue: false,
    required: true,
    type: 'string',
    example: faker.database.mongodbObjectId(),
  },
];
