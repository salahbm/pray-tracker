// scripts/push.js
const [, , target, type = 'feat', ...msg] = process.argv;

const workspaceMap = {
  mobile: 'apps/mobile',
  backend: 'apps/backend',
  web: 'apps/web',
  shared: 'packages/shared',
  db: 'packages/db',
};

if (!target || !workspaceMap[target] || msg.length === 0) {
  console.error(
    "Usage: bun run push <mobile|backend|web|shared|db> <type> 'message'",
  );
  process.exit(1);
}

const path = workspaceMap[target];
const message = msg.join(' ');

const { execSync } = require('child_process');

try {
  execSync(`git add ${path}`.trim(), { stdio: 'inherit' });
  execSync(`git commit -m "${type}(${target}): ${message}"`, {
    stdio: 'inherit',
  });
  execSync(`git push`, { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Git push failed:', err.message);
}
