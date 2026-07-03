# GitHub CI/CD Setup Guide

Complete guide to setting up the automated testing and deployment pipeline for the Fishing App.

## ✅ What's Been Set Up

The repository now includes:

### GitHub Actions Workflows
- **deploy-backend.yml** - Auto-deploys backend to Railway on push to main
- **deploy-frontend.yml** - Auto-deploys frontend to Vercel on push to main
- **tests.yml** - Runs tests on every PR and push to main/develop
- **lint.yml** - Code quality checks with ESLint and Prettier

### Project Structure
```
.github/workflows/         - CI/CD automation
backend/                   - Express.js API
frontend/                  - React app
.gitignore                 - Git ignore rules
```

### What's Automated
- ✅ Tests run on every pull request (blocks merge if failing)
- ✅ Code is linted and formatted automatically
- ✅ Push to main automatically deploys to production
- ✅ Environment variables are injected at deploy time
- ✅ Database migrations run automatically (when implemented)

## 🔐 Next Step 1: Set Up GitHub Secrets

GitHub Actions uses these secrets for deployment. Set them in:
**Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets

#### Backend / Shared
| Secret Name | Value | Source |
|-------------|-------|--------|
| `RAILWAY_API_TOKEN` | Your Railway API token | [railway.app](https://railway.app) → Account → Tokens |
| `DATABASE_URL` | PostgreSQL connection string | Set up in step 2 (Railway) |
| `OPENWEATHERMAP_API_KEY` | Weather API key | [openweathermap.org](https://openweathermap.org/api) |
| `MAPBOX_TOKEN` | Mapbox access token | [mapbox.com](https://account.mapbox.com/tokens/) |

#### Frontend
| Secret Name | Value | Source |
|-------------|-------|--------|
| `VERCEL_TOKEN` | Your Vercel API token | [vercel.com](https://vercel.com/account/tokens) |
| `VERCEL_PROJECT_ID` | Vercel project ID | Set up in step 3 (Vercel) → Settings |
| `VERCEL_ORG_ID` | Vercel organization ID | [vercel.com](https://vercel.com/account/billing) → Team ID |
| `REACT_APP_API_URL` | Backend API URL | e.g., `https://fishing-app-backend.railway.app` |
| `REACT_APP_MAPBOX_TOKEN` | Mapbox token (same as above) | From MAPBOX_TOKEN |

## 🚂 Next Step 2: Set Up Backend Deployment (Railway)

Railway hosts your backend API and database.

### Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Connect your GitHub account if needed
6. Select `bsalsa2/tightlines` repository

### Add PostgreSQL Database

1. In your Railway project, click "+ New Service"
2. Select "PostgreSQL"
3. Railway auto-creates the database
4. Note the `DATABASE_URL` from the PostgreSQL variables

### Configure Backend Service

1. Railway auto-detects the backend from `backend/package.json`
2. In "Variables" tab, add environment variables:
   ```
   DATABASE_URL=<value from PostgreSQL>
   NODE_ENV=production
   OPENWEATHERMAP_API_KEY=<your_key>
   MAPBOX_TOKEN=<your_token>
   JWT_SECRET=<generate_a_secure_random_string>
   ```
3. Link PostgreSQL service to backend
4. Note your Railway project ID from the URL

### Get Railway API Token

1. Go to [railway.app](https://railway.app) Account Settings
2. Click "Tokens"
3. Create a new token
4. Copy and save as GitHub Secret `RAILWAY_API_TOKEN`

### Enable Auto-Deploy

1. In Railway project settings, enable "Deploy on push"
2. It will trigger on every git push
3. Our GitHub Actions workflow will trigger the deployment automatically

**After this step**: Pushing code to main/backend/ will trigger automatic deployment

## 🌐 Next Step 3: Set Up Frontend Deployment (Vercel)

Vercel hosts your React frontend.

### Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Search for and select `tightlines` repository
5. Vercel will auto-detect "Create React App"

### Configure Environment Variables

1. In project settings → "Environment Variables"
2. Add variables for all environments (Production, Preview, Development):
   ```
   REACT_APP_API_URL = https://your-railway-backend.railway.app
   REACT_APP_MAPBOX_TOKEN = <your_mapbox_token>
   REACT_APP_ENV = production
   ```
3. Save and redeploy

### Get Vercel Tokens

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token (Scopes: read and write access)
3. Copy and save as GitHub Secret `VERCEL_TOKEN`

### Get Project & Organization IDs

1. In Vercel project → Settings → General
2. Copy "Project ID" → save as `VERCEL_PROJECT_ID`
3. Copy "Team ID" (if using team) → save as `VERCEL_ORG_ID`
   - Or your user ID if personal project

**After this step**: Pushing code to main/frontend/ will trigger automatic deployment

## 🧪 Step 4: Enable Branch Protection (Optional but Recommended)

Protects `main` branch from broken deployments.

1. Go to Repository Settings → Branches
2. Under "Branch protection rules", click "Add rule"
3. Pattern: `main`
4. Check:
   - ✅ "Require a pull request before merging"
   - ✅ "Require status checks to pass before merging"
   - ✅ "Require branches to be up to date before merging"
5. Select status checks:
   - `backend-tests` (from tests.yml)
   - `frontend-tests` (from tests.yml)
   - `backend-lint` (from lint.yml)
   - `frontend-lint` (from lint.yml)
6. Save

## 📊 Step 5: Optional - Set Up Error Monitoring (Sentry)

Automatic error alerts when something breaks in production.

### Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Sign up and create a new organization
3. Create two projects:
   - Node.js (for backend)
   - React (for frontend)
4. Copy the DSN for each

### Configure Backend

1. In GitHub Secrets, add `SENTRY_DSN` with backend DSN
2. Backend server.js already has Sentry integration hook points
3. Add Sentry integration:
   ```javascript
   const Sentry = require('@sentry/node');
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   app.use(Sentry.Handlers.errorHandler());
   ```

### Configure Frontend

1. In Vercel environment variables, add `REACT_APP_SENTRY_DSN` with frontend DSN
2. Initialize in React App.js or index.js

**After setup**: Errors automatically reported to Sentry dashboard

## 🚀 Testing the Setup

### Test Backend Deployment

1. Push a test commit to main/backend/:
   ```bash
   git checkout -b test/verify-cicd
   echo "# CI/CD Test" >> backend/TEST.md
   git add .
   git commit -m "Test CI/CD"
   git push origin test/verify-cicd
   ```

2. Create a PR on GitHub
3. Watch "Actions" tab - tests should run
4. When PR is merged, watch GitHub Actions deploy to Railway
5. Check Railway dashboard for deployment status
6. Test API endpoint: `https://your-railway-backend.railway.app/health`

### Test Frontend Deployment

1. Push a test commit to main/frontend/
2. Create PR and merge
3. Watch GitHub Actions build and deploy to Vercel
4. Check Vercel dashboard for deployment
5. Visit your Vercel URL (from Vercel dashboard)

## ✅ Verification Checklist

- [ ] GitHub Secrets set for backend (RAILWAY_API_TOKEN, DATABASE_URL, etc.)
- [ ] GitHub Secrets set for frontend (VERCEL_TOKEN, etc.)
- [ ] Railway project created and linked
- [ ] PostgreSQL database added to Railway
- [ ] Railway `DATABASE_URL` added to GitHub Secrets
- [ ] Vercel project created and linked
- [ ] Vercel environment variables configured
- [ ] Vercel API token saved to GitHub Secrets
- [ ] Branch protection rules enabled on main (optional)
- [ ] Sentry setup complete (optional)

## 📖 Common Commands

```bash
# Create feature branch
git checkout -b feature/your-feature

# Test locally before pushing
cd backend && npm test
cd ../frontend && npm run build

# Commit and push
git add .
git commit -m "Your message"
git push origin feature/your-feature

# Create PR on GitHub
# GitHub will run tests automatically

# After review, merge PR
# GitHub Actions automatically deploys to production
```

## 🔧 Troubleshooting

### Tests failing in GitHub Actions?

1. Check the workflow logs: Actions → workflow → job
2. See "Show more" sections for error details
3. Likely cause: Missing dependencies or environment variables
4. Fix locally first: `npm install` and test

### Deployment failing?

**Backend (Railway):**
- Check Railway logs: Dashboard → your project → Logs tab
- Common issue: Missing environment variables
- Solution: Add missing variables in Railway project settings

**Frontend (Vercel):**
- Check Vercel logs: Dashboard → project → Deployments
- Common issue: Environment variables not set
- Solution: Update Vercel environment variables and redeploy

### GitHub Actions not running?

- Check if workflows are enabled: Settings → Actions → General → Allow actions
- Verify workflow file syntax is correct (YAML indentation matters)
- Try: Settings → Actions → Re-run failed workflow

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)

## 🎯 Next Steps

1. Complete the setup steps above (2-5)
2. Push a test commit to verify everything works
3. Start developing features using feature branches
4. Every PR will auto-test
5. Every merge to main auto-deploys

**Remember**: After setup is complete, you never manually deploy anything. Push code → GitHub Actions tests it → Deploys automatically if tests pass.

That's the entire workflow. Enjoy coding!
