export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  DRAFT = 'DRAFT',
}

export const STATUS_LIST = Object.keys(STATUS);

export enum ACCESS_TYPE {
  ADMIN = 'ADMIN',
  MAINTAIN = 'MAINTAIN',
  WRITE = 'WRITE',
  READ = 'READ',
}
//
// export const USER_ROLES_LEVEL = {
//   [ACCESS_TYPE.ADMIN]: 1,
//   [ACCESS_TYPE.MANAGER]: 2,
//   [ACCESS_TYPE.AM]: 3,
//   [ACCESS_TYPE.AUDITOR]: 4,
//   [ACCESS_TYPE.TL]: 5,
//   [ACCESS_TYPE.FSE]: 6,
// };

export const ACCESS_TYPE_LIST = Object.keys(ACCESS_TYPE);
