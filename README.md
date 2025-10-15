# 🕌 Prayer Tracker Monorepo

This monorepo contains all parts of the Prayer Tracker ecosystem, built with modern technologies and best practices.

## 📁 Project Structure

```bash
prayer-tracker/
├── apps/
│   ├── mobile/     # Mobile app (React Native + Expo)
│   ├── backend/      # API server (Bun + Express)
│   └── web/         # Marketing site (Next.js)
├── packages/
│   ├── db/          # Prisma + Neon database package
│   └── shared/      # Shared utilities and types
└── package.json     # Root workspace configuration
```

## 🚀 Applications

### 📱 Mobile (Mobile App)

- **Tech Stack**: React Native + Expo
- **Features**:
  - Prayer time tracking and notifications
  - Qibla direction finder
  - Offline-first architecture
  - Multi-language support
- **Start Development**:
  ```bash
  cd apps/mobile
  bun install
  bun start
  ```

### ⚙️ Backend (API Server)

- **Tech Stack**: Bun + Express
- **Features**:
  - RESTful API endpoints
  - Prayer time calculations
  - User management
- **Start Development**:
  ```bash
  cd apps/backend
  bun install
  bun --watch src/index.ts
  ```

### 🌐 Web (Marketing Site)

- **Tech Stack**: Next.js 14
- **Features**:
  - Landing page
  - Blog/Documentation
  - Marketing content
- **Start Development**:
  ```bash
  cd apps/web
  bun install
  bun dev
  ```

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- Bun (latest version)
- iOS/Android development environment for mobile app

### First-time Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/prayer-tracker.git
cd prayer-tracker
```

2. Install dependencies at the repository root (this links every workspace)

```bash
bun install
```

3. Set up environment variables

```bash
# Copy environment files in each app directory
cp apps/mobile/.env.example apps/mobile/.env
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env
```

### Available Scripts

From the root directory Turborepo orchestrates workspace commands:

- `bun run build` – Build every package and application (respecting dependencies)
- `bun run dev` – Start backend, mobile, and web dev servers in parallel
- `bun run lint` – Lint all workspaces that expose a `lint` script
- `bun run test` – Run tests across applications
- `bun run typecheck` – Execute TypeScript checks for all workspaces

You can target a specific workspace with Turborepo filters, e.g. `bun run build --filter=@prayer/backend`.

## 📦 Shared Packages

### @prayer/shared

Common utilities and types used across applications live in `packages/shared`.

- Built via `bun run build --filter=@prayer/shared`
- Resolved through the `@prayer/shared` package name inside each app
- Compiled output is written to `packages/shared/dist`

### @prayer/db

Neon-aware Prisma schema and client live in `packages/db`.

- Configure credentials via `packages/db/.env` (copy from `.env.example`)
- Generate the Prisma client with `bun run build --filter=@prayer/db`
- Import the pooled client in apps using `import { prisma } from '@prayer/db'`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`bun run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Pushing the code

```
bun run push mobile fix "align radio buttons"
bun run push backend chore "update tsconfig"
bun run push shared refactor "optimize date utils"
bun run push web feat "add hero banner"
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
[SALAH](mailto:salah.dev@gmail.com)
</div>

<div align="center">
Made with ❤️ for the Muslim community
</div>
