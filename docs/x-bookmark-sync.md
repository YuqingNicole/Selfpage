# X bookmark sync

Bookmarks saved to the dedicated X folder `Selfpage` are copied into the public
bookmark library in Supabase. The website reads them directly, so new entries do
not require a commit or a redeploy.

New bookmarks intentionally arrive as `To Review`. The sync preserves the post
and author but does not invent a category, note, or content angle on Nicole's
behalf. Existing rows are never overwritten or deleted by the automated job.

## One-time setup

1. Apply `supabase/migrations/20260728010000_x_bookmark_sync.sql` to the linked
   Supabase project.
2. In the X Developer App, enable OAuth 2.0 and add this callback URL exactly:
   `http://127.0.0.1:8787/callback`.
3. The app needs these user scopes:
   `tweet.read users.read bookmark.read offline.access`.
4. From the repository root, authorize the account:

   ```bash
   read -r "X_CLIENT_ID?X Client ID: "
   read -rs "X_CLIENT_SECRET?X Client Secret (press Enter for a public client): "
   echo
   export X_CLIENT_ID X_CLIENT_SECRET
   npm run x:authorize
   npm run x:configure
   unset X_CLIENT_ID X_CLIENT_SECRET
   ```

   `x:authorize` uses OAuth 2.0 PKCE and saves the refresh token to a temporary
   ignored file with owner-only permissions. `x:configure` sends those values to
   GitHub Actions Secrets and deletes the local file.
5. Confirm the repository already has `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` Actions secrets.
6. Run the `Sync X bookmarks` workflow once with `workflow_dispatch`.

## Runtime behavior

- The workflow runs about every five minutes.
- A rotated X refresh token is kept in a private, RLS-protected Supabase table.
- Only the `Selfpage` folder is published.
- Removing an X bookmark does not remove it from the public library.
- Curated entries in `src/data/xBookmarks.ts` take precedence over synced
  duplicates.

## Local verification

No X or Supabase credentials are required for these checks:

```bash
npm run x:test
npm run x:fixture
```
