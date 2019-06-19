import chalk from 'chalk';
import meow from 'meow';

import { getPath } from '../../utils/path';
import { job as defaultJob } from './default';

const {
  input: [projectType, pathArg],
} = meow(chalk`
  {yellowBright Usage}
    $ ngt-cli create <projectType>

    {whiteBright Project types:}
      - react-app
`);

if (!projectType) {
  console.error(chalk`[{redBright.bold ERROR}] Missing project type`);
  process.exit(1);
}

const { path, cwd } = getPath(pathArg);

switch (projectType) {
  case 'react-app':
    {
      const { job: projectJob } = require(`./${projectType}`);

      [projectJob, defaultJob].map(async job => {
        try {
          await job(path, cwd);
        } catch (error) {
          console.error(error);
          process.exit(1);
        }
      });
    }
    break;

  default:
    console.error(
      chalk`[{redBright.bold ERROR} Unknow project type {bold ${projectType}}]`,
    );
}
