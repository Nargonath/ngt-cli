#!/usr/bin/env node

import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import spawn from 'cross-spawn';

import pkg from '../../package.json';

// alert users if new version is available
updateNotifier({ pkg }).notify();

// Inspired from https://github.com/seek-oss/sku/blob/master/bin/sku.js
const [, , script, ...args] = process.argv;

switch (script) {
  case 'create': {
    const scriptPath = require.resolve(`../scripts/${script}`);
    const scriptArgs = [scriptPath, ...args];

    const result = spawn.sync('node', scriptArgs, { stdio: 'inherit' });
    process.exit(result.status); // eslint-disable-line no-process-exit
    break;
  }
  default: {
    console.log(chalk`[{redBright.bold ERROR}] Unknown script {bold ${script}}`);
  }
}
