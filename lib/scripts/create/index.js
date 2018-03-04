import chalk from 'chalk';
import spawn from 'cross-spawn';
import { copy, pathExists } from 'fs-extra';
import { join } from 'path';

import { formatUserPath } from '../../utils';
import { dependencies } from './dependencies';

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(-1);
});

const [, , projectType, rawPath = process.cwd()] = process.argv;
const formattedPath = formatUserPath(rawPath);

if (!projectType) {
  throw new Error(chalk`[{redBright.bold ERROR}] A project type is required`);
}

(async function createCommand() {
  const templatePath = join(__dirname, `../../../templates/${projectType}`);
  const templateExist = await pathExists(templatePath);
  if (!templateExist) {
    throw new Error(chalk`[{redBright.bold ERROR}] Unknown project type {bold ${projectType}}`);
  }

  try {
    await copy(templatePath, formattedPath, { overwrite: false, errorOnExist: true });
  } catch (copyError) {
    throw new Error(chalk`[{redBright.bold ERROR}] Copy error. Details: ${copyError.message}`);
  }

  const npmProdResult = spawn.sync(
    'npm',
    ['install', '--save', '--save-exact', ...dependencies.prod],
    {
      stdio: 'inherit',
      cwd: formattedPath,
    },
  );
  if (npmProdResult.status !== 0) {
    throw new Error(
      chalk`[{redBright.bold ERROR}] Npm install dependencies error. Details: ${
        npmProdResult.error
      }`,
    );
  }

  const npmDevResult = spawn.sync(
    'npm',
    ['install', '--save-dev', '--save-exact', ...dependencies.dev],
    {
      stdio: 'inherit',
      cwd: formattedPath,
    },
  );
  if (npmDevResult.status !== 0) {
    throw new Error(
      chalk`[{redBright.bold ERROR}] Npm install dependencies error. Details: ${
        npmDevResult.error
      }`,
    );
  }

  console.log();
  console.log(
    chalk`[{greenBright.bold SUCCESS}] You are good to go. Don't forget to call {bold semantic-release-cli setup}`,
  );
})();
