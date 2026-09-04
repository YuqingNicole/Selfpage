#!/usr/bin/env node

import { readFile, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const SETUP_FILE = '.x-bookmark-setup.json';

function runGh(args, input) {
  const result = spawnSync('gh', args, {
    encoding: 'utf8',
    input,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `gh ${args.join(' ')} failed`);
  }
}

async function main() {
  const setup = JSON.parse(await readFile(SETUP_FILE, 'utf8'));
  const secrets = [
    ['X_CLIENT_ID', setup.clientId],
    ['X_REFRESH_TOKEN', setup.refreshToken],
  ];
  if (setup.clientSecret) secrets.push(['X_CLIENT_SECRET', setup.clientSecret]);

  for (const [name, value] of secrets) {
    if (!value) throw new Error(`${name} is missing from ${SETUP_FILE}`);
    runGh(['secret', 'set', name], `${value}\n`);
  }
  runGh(['variable', 'set', 'X_BOOKMARK_FOLDER_NAME', '--body', setup.folderName || 'Selfpage']);

  await unlink(SETUP_FILE);
  console.log('X credentials are now in GitHub Secrets. The local setup file was removed.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
