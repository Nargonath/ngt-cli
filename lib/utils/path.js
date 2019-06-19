import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';

export function getPath(pathArg) {
  const cwd = process.cwd();

  if (!pathArg) {
    return { path: '.', cwd };
  }

  if (path.isAbsolute(pathArg)) {
    return { path: pathArg, cwd };
  }

  return { path: path.join(cwd, pathArg), cwd };
}

export function getTemplatePath(templateName) {
  const templatePath = path.join(__dirname, `../../templates/${templateName}`);
  const pathExist = fs.pathExistsSync(templatePath);

  if (!pathExist) {
    console.error(
      chalk`[{redBright.bold ERROR}] Template does not exist {bold ${templateName}}`,
    );
    process.exit(1);
  }

  return templatePath;
}
