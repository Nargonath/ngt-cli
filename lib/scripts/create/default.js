import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { getTemplatePath } from '../../utils/path';

export async function job(path, cwd) {
  const templatePath = getTemplatePath('default');

  console.log();
  console.log('🤖 Add dependencies...');
  console.log();

  spawn.sync('yarn', ['add', '-D', 'ngt-scripts'], { stdio: 'inherit', cwd });

  console.log();
  console.log('📁 Copy default template...');
  console.log();

  await fs.copy(templatePath, path);
}
