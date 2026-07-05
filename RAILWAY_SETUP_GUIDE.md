# Railway Project Setup Guide

Complete step-by-step guide to deploy your Node.js backend and PostgreSQL database to Railway.

## ⏱️ Time Required: 20 minutes

## Prerequisites

- GitHub repository with the tightlines code
- Railway account (free signup available)
- OpenWeatherMap API key
- Mapbox token

---

## Step 1: Create Railway Account (If Needed)

### 1a. Go to Railway Website
- Visit: **https://railway.app**
- Click **"Start a New Project"** or **"Sign Up"**

### 1b. Sign Up Options
Choose one (Recommended: GitHub):
- **GitHub** ← Easiest
- Google
- Email

### 1c. Authorize GitHub (If Using GitHub Sign Up)
- Click "Continue with GitHub"
- GitHub will ask to authorize Railway
- Click **"Authorize Railway"**
- Enter your GitHub password if prompted

### 1d. Complete Setup
- Railway will create your account
- You'll be on the dashboard

**Status: ✅ Account created**

---

## Step 2: Create New Railway Project

### 2a. Access Dashboard
After login, you're on: **https://railway.app/dashboard**

### 2b. Create New Project
Look for a button:
- **"New Project"** or
- **"Create a new project"**

Click it.

### 2c. Project Creation Options
You'll see options:
```
┌─────────────────────────────┐
│ ✓ Deploy from GitHub        │  ← Click this
│ - Start from Template       │
│ - Provision from Marketplace│
│ - Empty Project             │
└─────────────────────────────┘
```

Click **"Deploy from GitHub"**

**Status: ✅ Started project creation**

---

## Step 3: Import GitHub Repository

### 3a. Connect GitHub (If First Time)
- Click "Deploy from GitHub"
- GitHub will ask to authorize Railway
- Click **"Authorize Railway-app"**
- Select your organization/account
- Confirm permissions

### 3b. Find Your Repository
A list of repositories appears:
```
Repositories
─────────────────────────────
□ tightlines        ← Select this
□ other-repo
□ another-repo
```

**Find and click:** `bsalsa2/tightlines`

### 3c. Select Branch
Choose which branch to deploy:
- **main** ← Select this for production

Click **"Deploy"** or **"Continue"**

**Status: ✅ Repository selected**

---

## Step 4: Configure Backend Service

### 4a. Railway Auto-Detection
Railway scans your repo and detects:
- ✓ Node.js application (from `backend/package.json`)
- ✓ MongoDB/PostgreSQL option

You'll see:
```
Detected Services:
├─ Node.js ✓
└─ (Add PostgreSQL next)
```

### 4b. Configure Node Service
Railway auto-configures Node.js. Verify:

1. **Root Directory**
   - Should be: `backend`
   - If not, change it

2. **Start Command**
   - Should be: `npm start` or `node server.js`
   - Verify in `backend/package.json`

3. **Watch for:**
   - Ensure it's the backend service
   - Make sure `PORT` env var is set

---

## Step 5: Add PostgreSQL Database

Railway makes this easy:

### 5a. Add Service to Project
Look for **"Add Service"** button or **"+"** icon

Click it and select from:
```
Database Services
─────────────────────────
□ PostgreSQL   ← Click this
□ MongoDB
□ MySQL
□ Redis
□ Other...
```

Click **"PostgreSQL"**

### 5b. Configure PostgreSQL
Railway auto-creates a PostgreSQL database:
- Name: Auto-generated
- Version: Latest stable
- Port: 5432 (default)

Just click **"Create"** or **"Add"**

### 5c. Link Services
Railway should auto-link the database to your Node app:
```
Services:
├─ Node.js Backend
│  └─ Connected to PostgreSQL ✓
└─ PostgreSQL
```

If not auto-linked:
1. Click the Node.js service
2. Find "Links" section
3. Click "Add Link"
4. Select PostgreSQL
5. Click "Link"

**Status: ✅ PostgreSQL database created and linked**

---

## Step 6: Set Environment Variables

Environment variables for your backend.

### 6a. Access Environment Variables
In Railway dashboard:
1. Click your **Node.js service**
2. Click **"Variables"** tab (or "Environment")
3. You'll see a form to add variables

### 6b. Add Backend Variables

Click **"New Variable"** for each:

#### 1. Database URL (Auto-added)
Should already exist:
```
DATABASE_URL: postgres://user:pass@localhost:5432/railway
```
✓ Already there, don't change

#### 2. Node Environment
```
Name:  NODE_ENV
Value: production
```

#### 3. JWT Secret
```
Name:  JWT_SECRET
Value: your-super-secret-key-123-abc
       (Generate a random string, keep it secret!)
```

**Generate a secure secret:**
- Option 1: Use an online generator
- Option 2: In terminal: `openssl rand -hex 32`
- Option 3: Use any random string of 32+ characters

#### 4. JWT Expiry
```
Name:  JWT_EXPIRY
Value: 7d
```

#### 5. OpenWeather API Key
```
Name:  OPENWEATHERMAP_API_KEY
Value: (your key from openweathermap.org)
```

#### 6. Mapbox Token
```
Name:  MAPBOX_TOKEN
Value: pk.eyJhbGciOiJIUzI1NiJ9...
       (your Mapbox token)
```

#### 7. Sentry (Optional, for later)
```
Name:  SENTRY_DSN
Value: (leave empty for now)
```

### 6c. Save Variables
Each variable saves automatically or after clicking **"Save"**

**Current state:**
```
Environment Variables:
✓ DATABASE_URL (auto-set)
✓ NODE_ENV = production
✓ JWT_SECRET = (your-secret)
✓ JWT_EXPIRY = 7d
✓ OPENWEATHERMAP_API_KEY = (your-key)
✓ MAPBOX_TOKEN = (your-token)
```

**Status: ✅ Environment variables configured**

---

## Step 7: Run Database Migrations

Your database exists, but you need to create tables.

### 7a. Two Options

**Option A: Manual SQL (Recommended for first time)**
1. In Railway dashboard, find PostgreSQL service
2. Click "Connect" or "Database" tab
3. You'll see connection details or a query editor
4. Use the query editor to run SQL

**Option B: Via Backend Command**
1. Wait for backend to deploy first (Step 8)
2. Connect via Railway CLI
3. Run migration command

### 7b. Run the Schema SQL

We'll do **Option A** for now:

1. Click your **PostgreSQL service** in Railway
2. Look for **"Query"** or **"Connect"** tab
3. Click **"Quick Links"** or **"Database"**
4. Find **"Postgres GUI"** or **"SQL Editor"**

You'll see a query editor:
```
┌─────────────────────────────┐
│ SQL Query Editor            │
│                             │
│ [Write SQL here]            │
│                             │
│ [Execute] [Clear]           │
└─────────────────────────────┘
```

### 7c. Copy and Paste Schema

1. Open: `backend/migrations/001_init_schema.sql` in your repo
2. Copy ALL the SQL
3. Paste into the Railway query editor
4. Click **"Execute"** or **"Run"**

Watch for success message:
```
✓ Query executed successfully
✓ 7 tables created
✓ Indexes created
✓ Triggers created
```

**Status: ✅ Database schema created**

---

## Step 8: Deploy Backend

### 8a. Trigger Deployment
In Railway dashboard:

**Option 1: Auto-Deploy**
- Railway auto-deploys when you push to GitHub
- Go to your GitHub repo
- Make a small change
- Push to main branch
- Railway detects and deploys

**Option 2: Manual Deploy**
1. Click your Node.js service
2. Look for **"Redeploy"** or **"Deploy"** button
3. Click **"Deploy Latest Commit"**

### 8b. Watch Deployment
Railway shows the deployment status:
```
Deployment Status:
├─ Building... (2 min)
├─ Deployed ✓ (1 min)
└─ Running ✓
```

### 8c. Deployment Complete! 🎉

Once complete:
```
Service Status:
✓ Status: Running
✓ Port: 3001 (or shown port)
✓ Domain: fishing-app-backend-production.railway.app
```

**Status: ✅ Backend deployed!**

---

## Step 9: Get Railway API Token

For GitHub Actions to auto-deploy.

### 9a. Generate Token
1. Go to Railway account settings: **https://railway.app/account**
2. Click **"Tokens"** section
3. Click **"Create Token"** or **"Generate"**

### 9b. Create Token
Fill in:
```
Token Name:  GitHub Actions CI/CD
Scope:       All Environments
(or choose specific project)
```

### 9c. Copy Token
```
Token: 1a2b3c4d5e6f7g8h...
```

**IMPORTANT:** Copy immediately! It only shows once.

This token goes to GitHub as: **`RAILWAY_API_TOKEN`**

**Status: ✅ Token created**

---

## Step 10: Get Backend URL

You'll need this for your frontend to communicate with the backend.

### 10a. Find Backend URL
In Railway dashboard:
1. Click your **Node.js service**
2. Look for **"Domains"** or **"URL"** section
3. You'll see something like:

```
Production Domain:
https://fishing-app-backend-production.railway.app
```

Copy this exact URL. You'll need it for Vercel!

### 10b. Test Backend Health
```bash
curl https://fishing-app-backend-production.railway.app/health
```

Should return:
```json
{
  "status": "ok",
  "service": "Fishing App API",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 120.5
}
```

If successful: ✅ Backend is live!

**Status: ✅ Backend URL confirmed**

---

## Step 11: Add Railway Token to GitHub Secrets

Now add the Railway token to GitHub so GitHub Actions can deploy.

### 11a. Go to GitHub Repository
1. Visit: **https://github.com/bsalsa2/tightlines**
2. Click **Settings** (top right)
3. Left sidebar → **Secrets and variables** → **Actions**

### 11b. Add RAILWAY_API_TOKEN

1. Click **"New repository secret"**
2. Fill in:
   ```
   Name:  RAILWAY_API_TOKEN
   Value: 1a2b3c4d5e6f7g8h...  (token from Railway)
   ```
3. Click **"Add secret"**

### 11c. Add DATABASE_URL

1. Click **"New repository secret"**
2. Fill in:
   ```
   Name:  DATABASE_URL
   Value: postgres://user:pass@host:5432/railway
          (from Railway PostgreSQL service)
   ```
3. Click **"Add secret"**

**Verify in GitHub:**
```
Settings → Secrets and variables → Actions

✓ RAILWAY_API_TOKEN
✓ DATABASE_URL
```

**Status: ✅ GitHub secrets configured**

---

## Step 12: Test Auto-Deployment

### 12a. Trigger a Deployment
1. Create test branch:
   ```bash
   git checkout -b test/railway-setup
   ```

2. Make a change:
   ```bash
   echo "# Test" >> backend/TEST.md
   git add .
   git commit -m "Test Railway deployment"
   git push origin test/railway-setup
   ```

3. Create PR on GitHub

### 12b. Watch GitHub Actions
1. Go to PR on GitHub
2. Click **"Checks"** tab
3. Watch `deploy-backend.yml` workflow
4. Should see:
   - Tests running ✓
   - Linting ✓
   - Deploying to Railway ✓

### 12c. Watch Railway Deployment
1. Go to **https://railway.app/dashboard**
2. Click your project
3. Watch deployment status update
4. Should show "Deployed" within 2 minutes

### 12d. Verify Deployment
Test the health endpoint:
```bash
curl https://fishing-app-backend-production.railway.app/health
```

Should return JSON with `"status": "ok"`

**Status: ✅ Railway auto-deployment verified!**

---

## Step 13: Final Integration

### 13a. Get Your URLs
Collect both URLs (you need them):

```
Backend URL:   https://fishing-app-backend-production.railway.app
Frontend URL:  https://tightlines.vercel.app (from Vercel setup)
```

### 13b. Update Vercel Frontend
The frontend needs to know the backend URL:

1. Go to Vercel dashboard
2. Click your project → Settings
3. Environment Variables
4. Update (or add if missing):
   ```
   REACT_APP_API_URL: https://fishing-app-backend-production.railway.app
   ```
5. Redeploy (or it auto-redeploys)

### 13c. Test Integration
1. Visit your frontend: **https://tightlines.vercel.app**
2. Open browser DevTools (F12)
3. Go to Console tab
4. Watch for API calls
5. Should see successful requests (no 404 errors)

**Status: ✅ Frontend and backend connected!**

---

## Troubleshooting

### "Build Failed"
**Check:**
1. Railway logs show the error
2. Click deployment → see logs
3. Common: Missing dependencies, Node version
4. Fix: Check `backend/package.json`
5. Redeploy

### "Cannot Connect to Database"
**Check:**
1. PostgreSQL service is running
2. DATABASE_URL environment variable is set
3. Schema migrations ran successfully
4. Check PostgreSQL logs in Railway

**Fix:**
1. Restart PostgreSQL service
2. Re-run migration SQL
3. Restart Node.js service

### "API Returning 500 Errors"
**Check:**
1. Railway logs for error messages
2. Check environment variables are set
3. Verify database is accessible
4. Check backend code for issues

**Fix:**
1. Review the specific error in logs
2. Fix the issue
3. Commit and push (auto-deploys)

### "CORS Errors in Frontend"
**Cause:** Frontend can't call backend API

**Fix:**
1. Verify `REACT_APP_API_URL` in Vercel is correct
2. Verify backend has CORS enabled (it does by default)
3. Check browser console for exact error
4. Verify backend URL is accessible

### "Can't Find Railway Project ID"
The project ID is in the URL:
```
https://railway.app/project/abc123xyz...
                           ^^^^^^^^^^^
                           This is the ID
```

---

## Final Checklist

Before moving to frontend setup:

```
Railway Setup:
✅ Account created
✅ Project created from GitHub
✅ Node.js backend configured
✅ PostgreSQL database created and linked
✅ Environment variables added (6+)
✅ Database schema migrated
✅ Backend deployed successfully
✅ Health check returns OK

Railway Integration:
✅ API token generated
✅ RAILWAY_API_TOKEN added to GitHub
✅ DATABASE_URL added to GitHub
✅ Backend URL copied

Testing:
✅ Test branch deployment worked
✅ Auto-deployment from GitHub works
✅ Backend responds to API calls
✅ Database is accessible

✅ RAILWAY SETUP COMPLETE!
```

---

## What Happens Next

### When You Push Backend Changes
1. GitHub Actions tests run
2. If tests pass, Railway deploys automatically
3. New version live in 2 minutes

### When You Need to Scale
Railway free tier handles:
- Small databases (PostgreSQL)
- Moderate traffic
- Easy to upgrade when needed

### Monitoring
- Railway dashboard shows logs
- Check deployment status
- Monitor database performance

---

## Quick Reference

### Railway Dashboard
- **URL:** https://railway.app/dashboard
- **Check:** Project status, logs, deployments

### Environment Variables
- **Location:** Railway Project → Service → Variables
- **7 Required:** DATABASE_URL, NODE_ENV, JWT_SECRET, JWT_EXPIRY, OPENWEATHERMAP_API_KEY, MAPBOX_TOKEN, SENTRY_DSN

### Backend URL
- **Production:** https://fishing-app-backend-production.railway.app
- **Custom Domain:** Can add in Railway settings

### GitHub Integration
- **Token:** In GitHub Secrets as RAILWAY_API_TOKEN
- **Auto-Deploy:** Happens on every push to main

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Support:** https://railway.app/support
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

**Status: You now have Railway set up with auto-deployment! 🚀**

Next: Set up Vercel frontend, then you're completely automated!
