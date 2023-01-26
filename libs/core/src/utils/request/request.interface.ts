import { Request } from 'express';
import { IResult } from 'ua-parser-js';
// import { IAuthApiPayload } from '@api/modules/auth/auth.interface';

export interface IRequestApp extends Request {
  userAgent?: IResult;
  id?: string;
  timezone: string;
  timestamp: string;
  customLang: string;
  apiKey?: any;
  user?: Record<string, any>;
  version?: string;
  __class: string;
  __function: string;
}
