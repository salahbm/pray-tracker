# Vercel Deployment Guide for NestJS Backend

This guide explains how to deploy the NestJS backend to Vercel serverless functions.

## Overview

The backend is configured to run as a Vercel serverless function with the following setup:
- **Entry Point**: `dist/serverless.js` (built from `src/serverless.ts`)
- **Module System**: CommonJS (required for Vercel serverless compatibility)
- **Framework**: NestJS with Express adapter

## Files Created for Vercel Deployment

1. **`vercel.json`** - Vercel configuration with rewrites
2. **`api/index.js`** - Vercel serverless function entry point
3. **`src/serverless.ts`** - Serverless handler with Express adapter
4. **`nest-cli.serverless.json`** - NestJS CLI config for serverless build
5. **`tsconfig.prod.json`** - Production TypeScript config (CommonJS)
6. **`.vercelignore`** - Files to exclude from deployment
7. **`.eslintignore`** - Ignore api directory from linting

## Environment Variables

Make sure all environment variables are set in your Vercel project settings:

### Required Variables
- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct database connection (for migrations)
- `PUBLIC_API_PORT` - API port (not used in serverless, but required by config)
- `BETTER_AUTH_URL` - Better Auth URL (e.g., https://your-domain.vercel.app)
- `BETTER_AUTH_SECRET` - Better Auth secret key

### Optional Variables (for full functionality)
- `R2_ACCESS_KEY_ID` - Cloudflare R2 access key
- `R2_SECRET_ACCESS_KEY` - Cloudflare R2 secret key
- `R2_ACCOUNT_ID` - Cloudflare R2 account ID
- `R2_BUCKET` - Cloudflare R2 bucket name
- `R2_S3_API_URL` - Cloudflare R2 S3 API URL
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_SECURE` - SMTP secure (true/false)
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password

## Build Process

The build script (`vercel-build`) runs in this order:
1. `prisma generate` - Generate Prisma Client
2. `nest build -p tsconfig.prod.json` - Build main application (CommonJS)
3. `nest build -c nest-cli.serverless.json -p tsconfig.prod.json` - Build serverless entry point
4. Vercel deploys `api/index.js` which imports `dist/serverless.js`

## How It Works

1. **Build Phase**: Vercel runs `vercel-build` script which compiles TypeScript to CommonJS in `dist/`
2. **Entry Point**: `api/index.js` serves as the Vercel serverless function entry point
3. **Handler**: `api/index.js` imports the compiled `dist/serverless.js` handler
4. **Routing**: All requests (`/*`) are rewritten to `/api/index` via `vercel.json`
5. **Execution**: The NestJS app is cached and reused across warm invocations

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Link to Vercel Project
```bash
cd apps/backend
vercel link
```

### 3. Set Environment Variables
```bash
# Set each variable
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
# ... add all other variables
```

Or use the Vercel dashboard to add them.

### 4. Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Turborepo Configuration

The `turbo.json` at the root has been updated to:
1. Include all environment variables in the `env` array
2. Add `dist/**` and `generated/**` to build outputs
3. This ensures Turborepo properly caches builds and passes environment variables

## Key Differences from Standard NestJS

### 1. Serverless Entry Point
Instead of the standard `main.ts` bootstrap, we use `serverless.ts` which:
- Creates a cached NestJS app instance
- Uses Express adapter for compatibility
- Exports a handler function for Vercel
- Reuses the app instance across invocations (warm starts)

### 2. Module System
- **Development**: Uses ES modules (`nodenext`)
- **Production**: Uses CommonJS (`commonjs`) for Vercel compatibility
- This solves the `ERR_REQUIRE_ESM` error with `better-auth` and `@noble/ciphers`

### 3. Build Output
- Main app: `dist/main.js` (for local development)
- Serverless: `dist/serverless.js` (for Vercel)

## Troubleshooting

### Issue: Environment variables not available
**Solution**: Make sure variables are:
1. Set in Vercel project settings
2. Listed in `turbo.json` under `tasks.build.env`

### Issue: ERR_REQUIRE_ESM error
**Solution**: This is fixed by using CommonJS in production (`tsconfig.prod.json`)

### Issue: Function timeout
**Solution**: 
- Vercel free tier has 10s timeout
- Pro tier has 60s timeout
- Optimize database queries and external API calls

### Issue: Cold starts are slow
**Solution**:
- The serverless function caches the NestJS app instance
- First request may be slow (cold start)
- Subsequent requests reuse the cached instance (warm starts)

### Issue: Database connection issues
**Solution**:
- Use connection pooling (Prisma Accelerate or PgBouncer)
- Set appropriate connection limits
- Use `DIRECT_URL` for migrations, `DATABASE_URL` for queries

## Local Testing

To test the serverless build locally:

```bash
# Build
pnpm build

# Test the serverless function
node -e "const handler = require('./dist/serverless').default; handler({method: 'GET', url: '/'}, {send: console.log})"
```

## Monitoring

- Check logs: `vercel logs <deployment-url>`
- View dashboard: https://vercel.com/dashboard
- Monitor performance in Vercel Analytics

## Best Practices

1. **Keep functions lightweight** - Minimize dependencies
2. **Use connection pooling** - For database connections
3. **Cache when possible** - Use the cached app instance pattern
4. **Set appropriate timeouts** - For external API calls
5. **Monitor cold starts** - Optimize initialization code
6. **Use environment variables** - Never hardcode secrets

## Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
