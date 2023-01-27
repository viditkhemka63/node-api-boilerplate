import { names } from '@nrwl/devkit';
import { snakeCase } from 'lodash';
/**
 * Creates generate files configuration object.
 * @param name library name
 * @param prefix library name prefix that should be removed from names
 */
export const generateFilesConfig = (name: string, prefix: string) => {
  const kebabCaseName = name.replace(prefix, '');
  const pascalCaseName = kebabCaseName
    .split('-')
    .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
    .join('');

  const snakeCaseName = snakeCase(name);
  const camelCaseName = kebabCaseName
    .split('-')
    .map((item, index) =>
      index === 0 ? item : `${item[0].toUpperCase()}${item.slice(1)}`
    )
    .join('');

  const upperCase = snakeCaseName.toUpperCase();

  const normalizedTitle = names(name).fileName;

  return {
    tmpl: '',
    name,
    kebabCaseName,
    pascalCaseName,
    camelCaseName,
    normalizedTitle,
    upperCase,
  };
};
