# @prayer/auth

Shared Better Auth instance configured for the Pray Tracker monorepo.

This package exposes the `auth` singleton configured to use the shared Prisma
client from `@prayer/db`. It also provides an Express middleware helper so the
backend can forward `/api/auth` requests directly to Better Auth without
re-declaring routes.

## Usage

```ts
import express from 'express';
import { createAuthMiddleware } from '@prayer/auth';

const app = express();
app.use(createAuthMiddleware());
```

The middleware inspects `req.originalUrl` and delegates requests that start with
`/api/auth` (configurable) to the Better Auth request handler. All other routes
continue through the Express stack.
