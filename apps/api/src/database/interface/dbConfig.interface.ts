export interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number | string;
  dialect?: string;
  urlDatabase?: string;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}

export interface IMongodbConfigAttribues {
  uri: string;
}

export interface IMongodbConfig {
  development: IMongodbConfigAttribues;
  test: IMongodbConfigAttribues;
  production: IMongodbConfigAttribues;
}
