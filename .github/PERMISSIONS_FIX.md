# Fixing GitHub Actions Pull Request Permissions

## Problem

GitHub Actions is getting "not permitted to create or approve pull requests" error when using changesets action.

## Solution Options

### Option 1: Enable Workflow Permissions in Repository Settings (Recommended)

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Scroll down to **Workflow permissions**
4. Select **"Read and write permissions"**
5. Check **"Allow GitHub Actions to create and approve pull requests"**
6. Click **Save**

This is the easiest fix and should resolve the issue immediately.

### Option 2: Use Personal Access Token (PAT)

If Option 1 doesn't work or you prefer more control:

1. **Create a Personal Access Token (PAT):**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - Give it these scopes:
     - `repo` (full control of private repositories)
     - `workflow` (update GitHub Action workflows)
   - Copy the token

2. **Add PAT to Repository Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PAT`
   - Value: Paste your token
   - Click "Add secret"

3. **Update the workflow** to use PAT:
   ```yaml
   env:
     GITHUB_TOKEN: ${{ secrets.PAT }}
     NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

### Option 3: Check Organization Settings (if applicable)

If this is an organization repository:

1. Go to Organization → Settings → Actions → General
2. Under "Workflow permissions", ensure it's set to allow PR creation
3. Check if there are any organization-level restrictions

## Current Workflow Configuration

The workflow already has:

```yaml
permissions:
  contents: write
  pull-requests: write
```

And checkout is configured with:

```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0
    token: ${{ secrets.GITHUB_TOKEN }}
```

## Verification

After applying Option 1, the next push to `main` should:

1. ✅ Create a branch `changeset-release/main`
2. ✅ Create a pull request automatically
3. ✅ Not show permission errors

## Troubleshooting

If still getting errors after Option 1:

1. **Check if Actions are enabled:**
   - Settings → Actions → General
   - Ensure "Allow all actions and reusable workflows" is selected

2. **Verify token permissions:**
   - The `GITHUB_TOKEN` should automatically have the permissions we specified
   - If using PAT, ensure it has `repo` scope

3. **Check branch protection:**
   - Settings → Branches
   - Ensure `main` branch doesn't have restrictions blocking Actions

4. **Try using a different token:**
   - Use PAT instead of GITHUB_TOKEN (see Option 2)

## References

- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [Changesets Action Documentation](https://github.com/changesets/action)
- [GitHub Workflow Permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#configuring-the-default-github_token-permissions)








