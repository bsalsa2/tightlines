# 🎣 Fishing App

A full-stack fishing application for tracking catches, logging locations, and sharing your fishing experience with the community.

## 📋 Project Structure

```
fishing-app/
├── .github/workflows/        # GitHub Actions CI/CD pipelines
│   ├── deploy-backend.yml   # Auto-deploy backend to Railway
│   ├── deploy-frontend.yml  # Auto-deploy frontend to Vercel
│   ├── tests.yml            # Run tests on PR/push
│   └── lint.yml             # Code quality checks
├── backend/                  # Node.js/Express API
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   ├── .env.example         # Environment template
│   └── server.test.js       # Test examples
├── frontend/                # React app
│   ├── src/                 # React components
│   ├── public/              # Static files
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment template
└── README.md               # This file
```

## 🚀 Quick Start (GitHub Codespaces)

**Easiest option - no local setup needed:**

1. Click `Code` → `Codespaces` → `Create codespace on main`
2. VS Code opens in your browser with everything pre-installed
3. Terminal:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Run locally:
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npm start
   ```

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL 15+ (for local database)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fishing-app.git
   cd fishing-app
   ```

2. Backend setup:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. Frontend setup (new terminal):
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm start
   ```

## 🔄 CI/CD Pipeline

Our GitHub Actions pipelines automate testing and deployment:

### Workflows

- **tests.yml**: Runs on every PR and push to `main`/`develop`
  - Backend: Tests + linting
  - Frontend: Build + linting
  - Blocks merge if tests fail

- **lint.yml**: Code quality checks
  - ESLint for both backend and frontend
  - Prettier formatting (frontend)

- **deploy-backend.yml**: Auto-deploys to Railway when code is pushed to `main`
  - Runs tests first
  - Deploys only if tests pass
  - Automatically injects environment variables

- **deploy-frontend.yml**: Auto-deploys to Vercel when code is pushed to `main`
  - Runs build validation
  - Deploys only if build succeeds
  - Automatically injects API URL

### Environment Variables (GitHub Secrets)

Set these in `Settings → Secrets and variables → Actions`:

**Backend/Shared:**
- `RAILWAY_API_TOKEN` - Railway deployment token
- `DATABASE_URL` - PostgreSQL connection string
- `OPENWEATHERMAP_API_KEY` - Weather API key
- `MAPBOX_TOKEN` - Maps API key

**Frontend:**
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_PROJECT_ID` - Vercel project ID
- `VERCEL_ORG_ID` - Vercel organization ID
- `REACT_APP_API_URL` - Backend API URL (e.g., https://your-railway-backend.railway.app)
- `REACT_APP_MAPBOX_TOKEN` - Mapbox token for frontend

## 📝 Development Workflow

### Creating a Feature

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

3. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

4. GitHub will:
   - Run tests automatically
   - Show results in the PR
   - Block merge if tests fail
   - Auto-deploy to production when merged to `main`

### Branch Protection Rules

The `main` branch is protected:
- ✅ Requires pull request review
- ✅ Requires status checks (tests) to pass
- ✅ Requires branches to be up to date

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test                    # Run tests once
npm run test:watch        # Watch mode
```

### Frontend Tests

```bash
cd frontend
npm test                   # Run tests
```

### Linting

```bash
# Backend
cd backend
npm run lint              # Check
npm run lint:fix          # Auto-fix

# Frontend
cd frontend
npm run lint              # Check
npm run lint:fix          # Auto-fix
npm run format            # Format with Prettier
```

## 🐛 Debugging Production

If something breaks in production:

1. **Check GitHub Actions**: `Actions` tab shows what deployed
2. **Check Railway logs**: Backend errors appear instantly
3. **Check Vercel logs**: Frontend errors appear instantly
4. **Check Sentry** (if configured): Automatic error monitoring

### Quick Rollback

```bash
git revert <commit-hash>
git push origin main
# Previous version auto-deploys in 2 minutes
```

## 🔐 Secrets Management

**Do NOT commit sensitive data.** GitHub will scan for leaked secrets.

### What goes in `.env` (local only):
```
DATABASE_URL=your_local_db_url
OPENWEATHERMAP_API_KEY=your_key
```

### What goes in GitHub Secrets (never commit):
- API keys
- Tokens
- Database URLs
- Any credentials

## 📦 Deployment Services

### Backend: Railway

1. Visit [railway.app](https://railway.app)
2. "Deploy from GitHub"
3. Connect repository
4. Railway auto-detects Node.js app
5. Add PostgreSQL service
6. Set environment variables
7. Done - auto-deploys on push to main/backend/

Cost: Free tier supports 500+ users

### Frontend: Vercel

1. Visit [vercel.com](https://vercel.com)
2. "Import Git Repository"
3. Select repository
4. Set environment variables
5. Deploy
6. Done - auto-deploys on push to main/frontend/

Cost: Free tier is sufficient

### Database: Railway PostgreSQL

Included with Railway backend setup. Connection string automatically provided.

## 📊 Monitoring

### Built-in Tools

- **Vercel Analytics**: Page load times, errors, traffic (automatic)
- **Railway Dashboard**: CPU, memory, requests (automatic)
- **GitHub Actions**: Deployment logs (automatic)

### Optional: Sentry (Error Monitoring)

1. Create account at [sentry.io](https://sentry.io)
2. Create project for Node.js + React
3. Add `SENTRY_DSN` to GitHub Secrets
4. Add to backend error handler:
   ```javascript
   const Sentry = require('@sentry/node');
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```

## 🤝 Collaboration

Multiple people can work simultaneously on different features:

```bash
# You: feature/catch-logging
git checkout -b feature/catch-logging
# ... code, commit, push

# Your teammate: feature/tournament-scoring
git checkout -b feature/tournament-scoring
# ... code, commit, push

# Both create PRs, both get tested, both merge independently
```

If you both touch the same file, GitHub shows merge conflict. Resolve in the browser or locally.

## 📚 API Documentation

(To be added as endpoints are created)

## 🛠️ Troubleshooting

### Tests failing locally?
```bash
# Backend: Make sure PostgreSQL is running
# Frontend: Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

### Deployment failing?
- Check GitHub Actions logs: `Actions` → workflow → job
- Check Railway logs for backend
- Check Vercel logs for frontend
- Ensure all secrets are set in GitHub Settings

### Environment variables not loading?
```bash
# Backend: Rename .env.example to .env, fill in values
# Frontend: Restart dev server after .env changes
# Vercel: Check Settings → Environment Variables
```

## 📖 Resources

- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📄 License

MIT

## 👥 Authors

Created with ❤️ for fishing enthusiasts.

---

**Remember**: Push code → tests run → deploys automatically → users see it.
No manual servers. No deployment scripts. Git is your operating system.