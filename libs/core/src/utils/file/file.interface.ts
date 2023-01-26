import { ClassConstructor } from 'class-transformer';
import { ENUM_FILE_TYPE } from './file.constant';

// @Todo use the 'Express.Multer.File' instad of any
export type IFile = any;

export interface IFileOptions {
  type?: ENUM_FILE_TYPE;
  required?: boolean;
  extract?: boolean;
  dto?: ClassConstructor<any>;
}

export interface IFileImageOptions {
  required?: boolean;
}

export interface IFileAudioOptions {
  required?: boolean;
}

export interface IFileVideoOptions {
  required?: boolean;
}

export interface IFileExcelOptions {
  required?: boolean;
  extract?: boolean;
  dto?: ClassConstructor<any>;
}
