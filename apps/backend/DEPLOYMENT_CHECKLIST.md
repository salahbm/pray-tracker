# Vercel Deployment Checklist

## ✅ Files Created/Modified

- [x] `vercel.json` - Rewrites all routes to `/api/index`
- [x] `api/index.js` - Serverless function entry point
- [x] `src/serverless.ts` - NestJS serverless handler
- [x] `nest-cli.serverless.json` - Serverless build config
- [x] `tsconfig.prod.json` - Production TypeScript config (CommonJS)
- [x] `.vercelignore` - Exclude unnecessary files
- [x] `.eslintignore` - Ignore api directory
- [x] `package.json` - Added `vercel-build` script and `express` dependency
- [x] `turbo.json` - Added environment variables and outputs

## 🚀 Deployment Steps

### 1. Commit and Push Changes

```bash
git add .
git commit -m "Configure backend for Vercel deployment"
git push
```

### 2. Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings and add these variables:

**Required:**

- `DATABASE_URL`
- `DIRECT_URL`
- `PUBLIC_API_PORT` (set to 4000)
- `BETTER_AUTH_URL` (your Vercel URL, e.g., https://your-app.vercel.app)
- `BETTER_AUTH_SECRET` (generate with: `openssl rand -base64 32`)

**Optional (for full functionality):**

- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ACCOUNT_ID`
- `R2_BUCKET`
- `R2_S3_API_URL`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_SECURE`
- `EMAIL_USER`
- `EMAIL_PASS`

### 3. Deploy

**Option A: Via Vercel Dashboard**

1. Connect your GitHub repository
2. Select the `apps/backend` directory as the root
3. Vercel will auto-detect and run `vercel-build`
4. Deploy!

**Option B: Via CLI**

```bash
cd apps/backend
vercel --prod
```

### 4. Test Deployment

```bash
# Test health endpoint
curl https://your-app.vercel.app/

# Test auth endpoint
curl https://your-app.vercel.app/api/auth/me
```

## 🔍 Troubleshooting

### Issue: 404 NOT_FOUND

**Cause**: Build artifacts not found or routing misconfigured
**Solution**:

- Ensure `vercel-build` script runs successfully
- Check that `dist/serverless.js` exists after build
- Verify `api/index.js` is present

### Issue: Build Fails

**Cause**: Missing dependencies or environment variables
**Solution**:

- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `DATABASE_URL` is accessible from Vercel

### Issue: ERR_REQUIRE_ESM

**Cause**: Module system mismatch
**Solution**: Already fixed! We use CommonJS in production via `tsconfig.prod.json`

### Issue: Database Connection Errors

**Cause**: Connection pooling or timeout issues
**Solution**:

- Use connection pooling (Prisma Accelerate or PgBouncer)
- Increase timeout settings
- Use `DIRECT_URL` for migrations only

### Issue: Cold Start Timeout

**Cause**: First request takes too long
**Solution**:

- Optimize imports (lazy load heavy dependencies)
- Use Prisma connection pooling
- Consider upgrading to Vercel Pro for longer timeouts

## 📊 Monitoring

- **Logs**: `vercel logs <deployment-url>` or check Vercel dashboard
- **Analytics**: Enable Vercel Analytics in project settings
- **Errors**: Check Vercel dashboard for runtime errors

## 🎯 Next Steps After Successful Deployment

1. Update mobile app `.env` with new backend URL
2. Test all API endpoints
3. Run database migrations if needed: `npx prisma migrate deploy`
4. Set up custom domain (optional)
5. Enable Vercel Analytics (optional)
6. Set up monitoring/alerts (optional)

## 📝 Important Notes

- **Build Time**: First build may take 2-3 minutes
- **Cold Starts**: First request after inactivity may be slow (3-5s)
- **Warm Starts**: Subsequent requests are fast (<100ms)
- **Timeouts**: Free tier = 10s, Pro tier = 60s
- **Regions**: Vercel automatically deploys to edge locations
- **Caching**: NestJS app instance is cached for warm starts

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs - Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [NestJS Documentation](https://docs.nestjs.com/)
