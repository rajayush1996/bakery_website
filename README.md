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

3. After saving all three secrets, the pipeline is ready — the next push or pull request to `master` will trigger a deployment.
