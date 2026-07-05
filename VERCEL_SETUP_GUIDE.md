# Vercel Project Setup Guide

Complete step-by-step guide to deploy your React frontend to Vercel.

## ⏱️ Time Required: 15 minutes

## Prerequisites

- GitHub repository with the tightlines code
- Vercel account (free signup available)
- Railway backend URL (from your Railway setup)
- Mapbox token (from earlier setup)

---

## Step 1: Create Vercel Account (If Needed)

### 1a. Go to Vercel Website
- Visit: **https://vercel.com**
- Click **"Sign Up"** in top right

### 1b. Sign Up Options
Choose one (Recommended: Sign up with GitHub):
- **GitHub** ← Easiest option
- Google
- GitLab
- Email

### 1c. Authorize GitHub (If Using GitHub Sign Up)
- Click "Continue with GitHub"
- GitHub will ask for authorization
- Click **"Authorize vercel"**
- You may need to enter your GitHub password

### 1d. Complete Setup
- Vercel will create your account
- You'll be redirected to your Vercel dashboard

**Status: ✅ Account created**

---

## Step 2: Create New Vercel Project

### 2a. Access Dashboard
After login, you're on the Vercel dashboard:
```
https://vercel.com/dashboard
```

### 2b. Create Project
Look for a button that says:
- **"New Project"** or
- **"Add New..."** → **"Project"**

Click it.

### 2c. Project Options
You'll see 3 options:
```
┌─────────────────────────────────┐
│ Import Git Repository           │  ← Click this
│ Clone Template                  │
│ Create from Command Line        │
└─────────────────────────────────┘
```

Click **"Import Git Repository"**

**Status: ✅ Started project creation**

---

## Step 3: Import GitHub Repository

### 3a. Search for Repository
A form appears asking "Select a Git Repository"

**Option A: If Connected to GitHub**
- Search box shows repositories you own
- Type "tightlines" in the search box
- Your repository appears: **bsalsa2/tightlines**
- Click on it to select

**Option B: If Not Connected Yet**
- Click "Add GitHub App" or "Connect Git Provider"
- Select "GitHub"
- Authorize Vercel to access your GitHub account
- Then search for "tightlines"

### 3b. Select Repository
```
┌────────────────────────────────────┐
│ bsalsa2/tightlines                 │
│ "Full-stack fishing application"   │
│                                    │
│ [Select]                           │
└────────────────────────────────────┘
```

Click **"Select"** or directly on the repository name

**Status: ✅ Repository connected**

---

## Step 4: Configure Project Settings

### 4a. Project Name
```
Project Name:  tightlines  (or your preferred name)
```
This is auto-filled from your repo name. Change if desired.

### 4b. Framework Preset
Vercel auto-detects: **"Create React App"** ✓

Leave as is. This is correct.

### 4c. Root Directory
```
Root Directory:  ./frontend
```

**IMPORTANT:** Change from default `.` to `./frontend`

- Click on "Root Directory" field
- Clear the `.` 
- Type `./frontend`
- Press Enter

This tells Vercel to build from the frontend folder, not the root.

### 4d. Build and Output Settings
These auto-fill correctly:
```
Build Command:     npm run build
Output Directory:  build
```
✓ These are correct - don't change

### 4e. Environment Variables
**Don't add yet!** We'll do this in the next step.

Just see the section titled "Environment Variables"

**Status: ✅ Basic settings configured**

---

## Step 5: Add Environment Variables

### 5a. Scroll to Environment Variables Section

You'll see:
```
┌─────────────────────────────────┐
│ Environment Variables           │
│                                 │
│ [Add]  [+]                      │
│                                 │
│ Name        Value               │
│ ────────────────────────────────│
│ (empty)     (empty)             │
└─────────────────────────────────┘
```

### 5b. Add First Variable: API URL

Click **[+]** or **[Add]** button

Fill in:
```
Name:  REACT_APP_API_URL

Value: https://your-railway-backend.railway.app
       (or your Railway backend URL)
```

**Where to get the value:**
- From your Railway project dashboard
- Copy the URL that looks like: `https://fishing-app-backend-production.railway.app`
- This is where your backend API runs

Click **"Save"** or press Enter

### 5c. Add Second Variable: Mapbox Token

Click **[+]** button again

Fill in:
```
Name:  REACT_APP_MAPBOX_TOKEN

Value: pk_pk.eyJhbGciOiJIUzI1NiJ9...
       (your Mapbox token)
```

**Where to get the value:**
- From Mapbox account: https://account.mapbox.com/tokens/
- Click on your default public token (or create one)
- Copy the token string
- Starts with: `pk.`

Click **"Save"** or press Enter

### 5d. Add Optional Variables (For Future Use)

These are optional but good to have:

```
Name:  REACT_APP_ENV
Value: production
```

```
Name:  REACT_APP_SENTRY_DSN
Value: (leave empty for now, add later if using Sentry)
```

**Current state:**
```
┌──────────────────────────────────────┐
│ Environment Variables                │
│                                      │
│ REACT_APP_API_URL                    │
│ https://your-railway-...             │
│                                      │
│ REACT_APP_MAPBOX_TOKEN               │
│ pk.eyJhbGciOiJIUzI1NiJ9...          │
│                                      │
│ REACT_APP_ENV                        │
│ production                           │
└──────────────────────────────────────┘
```

**Status: ✅ Environment variables added**

---

## Step 6: Deploy!

### 6a. Review Everything

Before deploying, verify:
- ✅ Project Name: `tightlines`
- ✅ Framework: `Create React App`
- ✅ Root Directory: `./frontend`
- ✅ Build Command: `npm run build`
- ✅ Environment variables: All 3 added

### 6b. Click Deploy

Look for a button:
- **"Deploy"** or
- **"Create"** or
- **"Deploy Now"**

Click it!

### 6c. Watch the Deployment

Vercel starts building:
```
Building...
├─ Installing dependencies
├─ Running build command
├─ Optimizing for production
├─ Creating deployment
└─ Done!
```

This takes 2-3 minutes. Don't close the page.

### 6d. Deployment Complete! 🎉

Once complete, you'll see:
```
┌──────────────────────────────┐
│ Deployment Successful!       │
│                              │
│ ✓ Domain: tightlines.vercel.app
│ ✓ Git Branch: main           │
│ ✓ Status: Production         │
│                              │
│ [Visit]                      │
└──────────────────────────────┘
```

**Status: ✅ Frontend deployed to production!**

---

## Step 7: Get Vercel Credentials for GitHub Secrets

Now we need to get the tokens to add to GitHub Secrets.

### 7a. Get Vercel API Token

1. Go to: **https://vercel.com/account/tokens**
2. Click **"Create Token"**
3. Fill in:
   ```
   Token Name:  GitHub Actions CI/CD
   Scope:       Full Account
   ```
4. Click **"Create Token"**
5. **Copy** the token immediately
   - It only shows once!
   - Store it somewhere safe

This token goes to GitHub as: **`VERCEL_TOKEN`**

### 7b. Get Project ID and Org ID

1. Go to your project: **https://vercel.com/dashboard/tightlines**
2. Click **Settings** tab at the top
3. Go to **General** section
4. Copy the **Project ID**
   - Looks like: `prj_abc123xyz...`
   - Add to GitHub as: **`VERCEL_PROJECT_ID`**

5. Find your **Team ID** (or Personal Account ID)
   - Go to: **https://vercel.com/account**
   - Look for "Team ID" or scroll to see your account info
   - If personal: it's your account ID
   - Looks like: `team_abc123...` or your username
   - Add to GitHub as: **`VERCEL_ORG_ID`**

**Status: ✅ All credentials collected**

---

## Step 8: Add Vercel Tokens to GitHub Secrets

Now add the credentials you just got to GitHub.

### 8a. Go to GitHub Repository Settings

1. Go to: **https://github.com/bsalsa2/tightlines**
2. Click **Settings** (top right)
3. Left sidebar → **Secrets and variables** → **Actions**

### 8b. Add VERCEL_TOKEN

1. Click **"New repository secret"**
2. Fill in:
   ```
   Name:  VERCEL_TOKEN
   Value: (paste the token from Vercel)
   ```
3. Click **"Add secret"**

### 8c. Add VERCEL_PROJECT_ID

1. Click **"New repository secret"**
2. Fill in:
   ```
   Name:  VERCEL_PROJECT_ID
   Value: prj_abc123xyz... (from Vercel Settings)
   ```
3. Click **"Add secret"**

### 8d. Add VERCEL_ORG_ID

1. Click **"New repository secret"**
2. Fill in:
   ```
   Name:  VERCEL_ORG_ID
   Value: team_abc123... (from Vercel Account)
   ```
3. Click **"Add secret"**

**Verify in GitHub:**
```
Settings → Secrets and variables → Actions

✓ VERCEL_TOKEN
✓ VERCEL_PROJECT_ID
✓ VERCEL_ORG_ID
```

**Status: ✅ GitHub secrets configured**

---

## Step 9: Test the Deployment

### 9a. Trigger a Test Deploy

1. Go to your project on GitHub
2. Create a test branch:
   ```bash
   git checkout -b test/vercel-setup
   ```

3. Make a small change:
   ```bash
   # Edit frontend/src/App.js - change the title or something small
   echo "# Test commit" >> frontend/TEST.md
   git add .
   git commit -m "Test Vercel deployment"
   git push origin test/vercel-setup
   ```

4. Create a PR on GitHub

### 9b. Watch GitHub Actions

1. Go to PR on GitHub
2. Click **"Checks"** tab
3. Watch the workflows run:
   - ✓ Tests run
   - ✓ Lint checks run
   - ✓ If passing, deploy-frontend.yml triggers

### 9c. Watch Vercel Deployment

1. Go to **https://vercel.com/dashboard/tightlines**
2. Click **"Deployments"** tab
3. You should see a new deployment building
   - Status: "Building"
   - Then: "Ready"
   - Includes a unique preview URL

### 9d. Visit Your Site

When deployment is complete:
1. You get a **Preview URL**: `https://tightlines-xxx.vercel.app`
2. Click it and verify your frontend loads!
3. You should see:
   - "🎣 Fishing App" header
   - Feature cards
   - Call-to-action buttons

**Status: ✅ Vercel deployment verified!**

---

## Step 10: Set Up Auto-Deploy on Main

When you merge the PR, auto-deploy should trigger automatically.

### 10a. Merge the Test PR

1. Go to your test PR on GitHub
2. If all checks pass, click **"Merge pull request"**
3. Confirm merge

### 10b. Watch Auto-Deploy

1. Go to **https://vercel.com/dashboard/tightlines**
2. New deployment starts automatically
3. Goes to your production domain: **tightlines.vercel.app**

### 10c. View Logs (If Something Goes Wrong)

On Vercel dashboard:
1. Click the deployment
2. See build logs
3. See any errors
4. Redeploy if needed

**Status: ✅ Auto-deploy working!**

---

## Troubleshooting

### "Build Failed"
**Solution:**
1. Check Vercel logs
2. Common causes:
   - Missing environment variables
   - Node version mismatch
   - Missing dependencies
3. Check `frontend/package.json` has all deps
4. Redeploy with "Redeploy" button

### "Environment Variables Not Working"
**Solution:**
1. Verify variables are set in Vercel Settings
2. Make sure names start with `REACT_APP_`
3. Redeploy after changing variables
4. Check browser console for errors

### "API Calls Returning 404"
**Solution:**
1. Verify `REACT_APP_API_URL` is correct in Vercel
2. Verify Railway backend is running
3. Check backend URL is accessible

### "Domain Shows Old Version"
**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache
3. Wait 30 seconds for CDN to update

### "Can't Find VERCEL_PROJECT_ID"
**Solution:**
1. Go to Vercel → Dashboard → tightlines → Settings
2. Scroll down to find Project ID
3. Copy the exact string
4. Add to GitHub Secrets exactly as shown

---

## Final Checklist

Before considering this done:

```
Vercel Setup:
✅ Account created
✅ Project imported from GitHub
✅ Root directory set to ./frontend
✅ Environment variables added (API_URL, MAPBOX_TOKEN)
✅ Initial deployment successful
✅ Can visit production URL

GitHub Integration:
✅ VERCEL_TOKEN added to Secrets
✅ VERCEL_PROJECT_ID added to Secrets
✅ VERCEL_ORG_ID added to Secrets

Testing:
✅ Test branch deployment worked
✅ Preview URL loads correctly
✅ Main branch auto-deploys
✅ Production URL has latest code

✅ VERCEL SETUP COMPLETE!
```

---

## What Happens Next

### When You Push to Feature Branch
1. GitHub Actions tests run
2. If tests pass, Vercel creates **preview URL**
3. You can test in browser before merge

### When You Merge to Main
1. GitHub Actions tests run
2. Vercel deploys to **production** (tightlines.vercel.app)
3. Live in 2 minutes
4. No manual steps needed

### Monitoring
- Check Vercel dashboard for deployment status
- Check analytics for page performance
- Check error logs if anything breaks

---

## Quick Reference

### Vercel Dashboard
- **URL:** https://vercel.com/dashboard/tightlines
- **Check:** Deployments, Settings, Analytics, Logs

### Environment Variables
- **Location:** Vercel Dashboard → Settings → Environment Variables
- **3 Required:** REACT_APP_API_URL, REACT_APP_MAPBOX_TOKEN, REACT_APP_ENV

### Production URL
- **Your Site:** https://tightlines.vercel.app
- **Custom Domain:** Add in Vercel Settings

### GitHub Integration
- **Automatic on:** Every push to main
- **Automatic on:** Every PR (creates preview)
- **Tokens:** In GitHub Secrets and variables

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **React Deployment:** https://vercel.com/docs/frameworks/nextjs (similar for Create React App)

---

**Status: You now have Vercel set up with auto-deployment! 🚀**

Next: Set up Railway backend, then you're ready to develop!
