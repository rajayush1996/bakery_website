# Bakery Website
Cake bakery platform for Asansol

## Vercel Deployment (CI/CD)

This repository includes a GitHub Actions workflow (`.github/workflows/vercel-deploy.yml`) that automatically deploys to Vercel:

- **Pull requests** → preview deployment
- **Push to `master`** → production deployment

### Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Node.js](https://nodejs.org/) installed locally (v18+)
3. The Vercel CLI: `npm install -g vercel`

### Step 1 — Get your `VERCEL_TOKEN`

1. Log in to [Vercel](https://vercel.com).
2. Go to **Settings → Tokens** (direct link: <https://vercel.com/account/tokens>).
3. Click **Create Token**.
4. Give it a descriptive name (e.g. `github-actions-deploy`), choose a scope that covers your project, and set an expiration.
5. Click **Create Token** and **copy the value immediately** — it is only shown once.

### Step 2 — Get your `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

1. Open a terminal in your local clone of this repository.
2. Run:
   ```bash
   vercel link
   ```
3. Follow the interactive prompts to link the directory to your Vercel project. If the project doesn't exist on Vercel yet, the CLI will offer to create it.
4. Once linked, open the generated file:
   ```bash
   cat .vercel/project.json
   ```
5. You will see output like:
   ```json
   {
     "orgId": "team_xxxxxxxxxxxxxxxxxxxxxxxx",
     "projectId": "prj_yyyyyyyyyyyyyyyyyyyyyyyy"
   }
   ```
   - **`orgId`** → this is your `VERCEL_ORG_ID`
   - **`projectId`** → this is your `VERCEL_PROJECT_ID`

> **Note:** The `.vercel` directory is already listed in `.gitignore`, so these values are never committed to the repo.

### Step 3 — Add the secrets to GitHub

1. Go to your GitHub repository → **Settings → Secrets and variables → Actions**.
2. Click **New repository secret** and add each of the following:

   | Secret name         | Value                                          |
   |---------------------|-------------------------------------------------|
   | `VERCEL_TOKEN`      | The token you created in Step 1                |
   | `VERCEL_ORG_ID`     | The `orgId` from `.vercel/project.json`        |
   | `VERCEL_PROJECT_ID` | The `projectId` from `.vercel/project.json`    |

3. After saving all three secrets, the pipeline is ready.

### Step 4 — Deploy

Once the secrets are in place, deployments are **fully automatic** — no manual steps needed.

#### Preview deployment (pull request)

1. Create a feature branch and push your changes:
   ```bash
   git checkout -b my-feature
   # ... make your changes ...
   git add .
   git commit -m "Add my feature"
   git push origin my-feature
   ```
2. Open a **Pull Request** targeting the `master` branch on GitHub.
3. The workflow will automatically:
   - Lint and build the project
   - Deploy a **preview** version to Vercel
   - Post the preview URL in the PR's **Environments** section

#### Production deployment (push to master)

1. Merge your pull request into `master` (or push directly to `master`).
2. The workflow will automatically:
   - Lint and build the project
   - Deploy the **production** version to Vercel
   - The production URL appears in the **Environments** section of the commit

#### Checking deployment status

- Go to the **Actions** tab in your GitHub repository to see all workflow runs.
- Click on any run to view detailed logs for each step (lint, build, deploy).
- The deployment URL is also available in **Settings → Environments** on your repository.

#### Troubleshooting

| Symptom | Fix |
|---------|-----|
| Workflow fails at "Pull Vercel environment" | Double-check that `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are set correctly in repository secrets. |
| Workflow fails at "Lint" or "Build" | The code has errors — fix them locally with `npm run lint` and `npm run build`, then push again. |
| Workflow never runs | Make sure the branch targets `master` (for PRs) or you pushed to `master` (for production). |
