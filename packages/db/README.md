# `@prayer/db`

Shared Prisma database package configured for the Neon serverless Postgres platform.

## Usage

1. **Install dependencies**

   Make sure the workspace dependencies are installed from the monorepo root:

   ```bash
   bun install
   ```

2. **Provide Neon connection strings**

   The package expects the following environment variables when it is imported:

   - `DATABASE_URL`: your Neon pooled connection string with `?sslmode=require`.
   - `DIRECT_URL`: an optional direct connection string used for migrations and long running scripts.
   - `SHADOW_DATABASE_URL`: optional connection string for Prisma migrations shadow database.

   You can copy `.env.example` and fill in the values locally.

3. **Generate the Prisma client**

   Prisma must be generated before running any app that depends on this package:

   ```bash
   bun run --filter @prayer/db build
   ```

   Turborepo will automatically build the package when you run the root `build`, `dev`, or `typecheck` pipelines.

4. **Import the client**

   Consumers can import the ready-to-use Prisma client from `@prayer/db`:

   ```ts
   import { prisma } from '@prayer/db';
   ```

   All Prisma models and helper types are re-exported as well:

   ```ts
   import type { User } from '@prayer/db';
   ```

## Prisma schema location

The source of truth for the schema now lives at `packages/db/prisma/schema.prisma`. Run Prisma CLI commands from this package:

```bash
cd packages/db
bunx prisma migrate dev
```

## Scripts

- `bun run build` – cleans the build output, generates the Prisma client, and compiles the TypeScript sources.
- `bun run generate` – runs `prisma generate` using the shared schema.
- `bun run typecheck` – type checks the package without emitting JavaScript.
- `bun run clean` – removes the `dist` folder.
