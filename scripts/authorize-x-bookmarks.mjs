#!/usr/bin/env node

import { createHash, randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const AUTHORIZE_URL = 'https://x.com/i/oauth2/authorize';
const TOKEN_URL = 'https://api.x.com/2/oauth2/token';
const CALLBACK_URL = process.env.X_REDIRECT_URI || 'http://127.0.0.1:8787/callback';
const SETUP_FILE = '.x-bookmark-setup.json';
const SCOPES = ['tweet.read', 'users.read', 'bookmark.read', 'offline.access'];

function base64Url(buffer) {
  return buffer
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function openBrowser(url) {
  const command =
    process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  const child = spawn(command, args, { detached: true, stdio: 'ignore' });
  child.on('error', () => {
    console.log(`Open this URL in your browser:\n${url}`);
  });
  child.unref();
}

async function exchangeCode(code, verifier, clientId, clientSecret) {
  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: CALLBACK_URL,
    code_verifier: verifier,
  });
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  } else {
    body.set('client_id', clientId);
  }

  const response = await fetch(TOKEN_URL, { method: 'POST', headers, body });
  const token = await response.json();
  if (!response.ok) {
    throw new Error(`X authorization failed (${response.status}). Check the callback URL and app type.`);
  }
  return token;
}

function waitForCallback(expectedState) {
  return new Promise((resolve, reject) => {
    const callback = new URL(CALLBACK_URL);
    const server = createServer((request, response) => {
      const url = new URL(request.url || '/', CALLBACK_URL);
      if (url.pathname !== callback.pathname) {
        response.writeHead(404).end('Not found');
        return;
      }

      const error = url.searchParams.get('error');
      const state = url.searchParams.get('state');
      const code = url.searchParams.get('code');

      if (error || state !== expectedState || !code) {
        response
          .writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
          .end('Authorization failed. Return to the terminal for details.');
        server.close();
        reject(new Error(error || 'The OAuth callback was invalid.'));
        return;
      }

      response
        .writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        .end(
          '<main style="font:16px system-ui;max-width:520px;margin:80px auto;padding:24px"><h1>Connected.</h1><p>You can close this tab and return to the terminal.</p></main>',
        );
      server.close();
      resolve(code);
    });

    server.on('error', reject);
    server.listen(Number(callback.port || 80), callback.hostname);

    setTimeout(() => {
      server.close();
      reject(new Error('Authorization timed out after 5 minutes.'));
    }, 5 * 60 * 1000).unref();
  });
}

async function main() {
  const clientId = process.env.X_CLIENT_ID?.trim();
  const clientSecret = process.env.X_CLIENT_SECRET?.trim() || '';
  if (!clientId) {
    throw new Error(
      'Set X_CLIENT_ID before running this command. X_CLIENT_SECRET is optional for public clients.',
    );
  }

  const callback = new URL(CALLBACK_URL);
  if (callback.protocol !== 'http:' || !['127.0.0.1', 'localhost'].includes(callback.hostname)) {
    throw new Error('For local setup, X_REDIRECT_URI must use http://127.0.0.1 or localhost.');
  }

  const state = base64Url(randomBytes(24));
  const verifier = base64Url(randomBytes(48));
  const challenge = base64Url(createHash('sha256').update(verifier).digest());
  const authorizeUrl = new URL(AUTHORIZE_URL);
  authorizeUrl.search = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: CALLBACK_URL,
    scope: SCOPES.join(' '),
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  }).toString();

  console.log(`Waiting for X authorization at ${CALLBACK_URL}`);
  openBrowser(authorizeUrl.toString());
  const code = await waitForCallback(state);
  const token = await exchangeCode(code, verifier, clientId, clientSecret);
  if (!token.refresh_token) {
    throw new Error('X did not return a refresh token. Confirm offline.access is enabled.');
  }

  await writeFile(
    SETUP_FILE,
    `${JSON.stringify(
      {
        clientId,
        clientSecret,
        refreshToken: token.refresh_token,
        folderName: process.env.X_BOOKMARK_FOLDER_NAME?.trim() || 'Selfpage',
      },
      null,
      2,
    )}\n`,
    { mode: 0o600 },
  );
  console.log(`Authorization succeeded. Credentials were saved locally to ${SETUP_FILE}.`);
  console.log('Run npm run x:configure to send them to GitHub Secrets and remove the local file.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
