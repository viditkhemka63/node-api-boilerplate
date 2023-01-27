// import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';

// export default async function (tree: Tree, schema: any) {
//   await libraryGenerator(tree, { name: schema.name });
//   await formatFiles(tree);
//   return () => {
//     installPackagesTask(tree);
//   };
// }

import { Tree, formatFiles } from '@nrwl/devkit';
import { generateFiles, joinPathFragments, names } from '@nrwl/devkit';
import { INestResource } from './schema.interface';
import { generateFilesConfig } from '../utils/generate-files.config';

const root = './_generated';
/**
 * Adds/replaces files generated for the resource by default.
 */
const addFiles = (schema: INestResource, tree: Tree) => {
  // const config: ProjectConfiguration = readProjectConfiguration(
  //   tree,
  //   schema.name
  // );
  // const root = config.root;

  const generateFilesConf = generateFilesConfig(schema.name, 'client-');

  generateFiles(tree, joinPathFragments(__dirname, './files'), root, {
    ...generateFilesConf,
  });
};

export default async function (tree: Tree, schema: INestResource) {
  addFiles(schema, tree);

  // generateFiles(
  //   // virtual file system
  //   tree,

  //   // the location where the template files are
  //   joinPathFragments(__dirname, './files'),

  //   // where the files should be generated
  //   './_test',

  //   // the variables to be substituted in the template
  //   {
  //     tmpl: '',
  //     title: schema.name,
  //     normalizedTitle: names(schema.name).fileName,
  //     creationDate: new Date().toISOString(),
  //   }
  // );

  await formatFiles(tree);
}
