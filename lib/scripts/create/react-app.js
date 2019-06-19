import spawn from 'cross-spawn';

export async function job(dest, cwd) {
  console.log();
  console.log('🛠 Creating react app...');
  console.log();

  spawn.sync('npx', ['create-react-app', dest], { stdio: 'inherit', cwd });
}
