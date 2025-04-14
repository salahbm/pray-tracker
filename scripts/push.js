// scripts/push.js
const [, , target, type = 'feat', ...msg] = process.argv;

if (!target || msg.length === 0) {
  console.error(
    "Usage: bun run push <frontend|backend|web|shared> <type> 'message'"
  );
  process.exit(1);
}

const path = target === 'shared' ? 'packages/shared' : `apps/${target}`;
const message = msg.join(' ');

const { execSync } = require('child_process');

try {
  execSync(`git add ${path}`, { stdio: 'inherit' });
  execSync(`git commit -m "${type}(${target}): ${message}"`, {
    stdio: 'inherit',
  });
  execSync(`git push`, { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Git push failed:', err.message);
}
