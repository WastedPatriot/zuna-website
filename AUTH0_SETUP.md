# Auth0 Setup Guide for Zuna Website

## Prerequisites
Auth0 package is already installed: `@auth0/nextjs-auth0`

## Setup Steps

### 1. Create Auth0 Application
1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create a new Application
3. Choose "Regular Web Application"
4. Note down your:
   - Domain (e.g., `your-tenant.auth0.com`)
   - Client ID
   - Client Secret

### 2. Configure Auth0 Application Settings
In your Auth0 Application settings, add:

**Allowed Callback URLs:**
```
http://localhost:3000/api/auth/callback
https://your-vercel-app.vercel.app/api/auth/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000/
https://your-vercel-app.vercel.app/
```

### 3. Set Environment Variables

Create `.env.local` file in the root of `zuna-website`:
```env
AUTH0_SECRET='[A long, randomly generated string - at least 32 characters]'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://[YOUR_AUTH0_DOMAIN]'
AUTH0_CLIENT_ID='[YOUR_AUTH0_CLIENT_ID]'
AUTH0_CLIENT_SECRET='[YOUR_AUTH0_CLIENT_SECRET]'
```

For production (Vercel), add these as environment variables in your Vercel project settings, changing:
- `AUTH0_BASE_URL` to your production URL (e.g., `https://your-app.vercel.app`)

### 4. Generate AUTH0_SECRET
Run this command to generate a secure secret:
```bash
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

### 5. Enable Auth0 in the Code
Once environment variables are set:

1. In `app/layout.tsx`, uncomment the Auth0 imports
2. In `app/page.tsx`, uncomment the useUser hook
3. Create `app/api/auth/[auth0]/route.ts`:

```typescript
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
```

### 6. Test Locally
```bash
npm run dev
```

Visit http://localhost:3000/api/auth/login to test login

## Deployment to Vercel
1. Add all environment variables to Vercel project settings
2. Deploy the application
3. Update Auth0 Application URLs with your production domain

## Current Status
Auth0 is installed but not activated to allow deployment without environment configuration. Follow the steps above to enable authentication.
