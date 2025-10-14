## Shared Workspaces

### `@prayer/shared`

This workspace is resolved through the `@prayer/shared` package name and is
compiled with TypeScript into `dist/`. Keep shared utilities, hooks, types and
constants here so they can be consumed by the backend, web, and mobile apps.

### `@prayer/db`

The Neon/Prisma database layer lives in this workspace. Its schema is at
`packages/db/prisma/schema.prisma` and it exports a pooled Prisma client via the
`@prayer/db` entrypoint. Run Prisma CLI commands from this package so migrations
and generated clients remain in sync across the monorepo.
