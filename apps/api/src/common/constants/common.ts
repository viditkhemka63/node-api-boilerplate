export const APPLICATION_NAME = 'Api boilerplate';
export const SEQUELIZE = 'SEQUELIZE';
export const MONGOOSE = 'MONGODB';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';

export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const SORT_ORDER_LIST = (() => Object.keys(SORT_ORDER))();
export const FIRST_ADMIN_EMAIL = 'admin@mail.com';

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  DRAFT = 'DRAFT',
}

export const STATUS_LIST = Object.keys(STATUS);

export enum INVITATION_STATUS {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export const INVITATION_STATUS_LIST = Object.keys(INVITATION_STATUS);

export const DEFAULT_PASSWORD = 'Test@123';
