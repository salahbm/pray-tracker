# 🕌 Prayer Tracker Monorepo

This monorepo contains all parts of the Prayer Tracker ecosystem, built with modern technologies and best practices.

## 📁 Project Structure

```bash
prayer-tracker/
├── apps/
│   ├── frontend/     # Mobile app (React Native + Expo)
│   ├── backend/      # API server (Bun + Express)
│   └── web/         # Marketing site (Next.js)
├── packages/
│   └── shared/      # Shared utilities and types
└── package.json     # Root workspace configuration
```

## 🚀 Applications

### 📱 Frontend (Mobile App)

- **Tech Stack**: React Native + Expo
- **Features**:
  - Prayer time tracking and notifications
  - Qibla direction finder
  - Offline-first architecture
  - Multi-language support
- **Start Development**:
  ```bash
  cd apps/frontend
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

2. Install dependencies

```bash
bun install
```

3. Set up environment variables

```bash
# Copy environment files in each app directory
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env
```

### Available Scripts

From the root directory:

- `bun run build`: Build all applications
- `bun run dev`: Start all applications in development mode
- `bun run lint`: Lint all applications
- `bun run test`: Run tests across all applications

## 📦 Shared Packages

### @prayer/shared

Common utilities and types used across applications:

- Types definitions
- Helper functions
- Constants

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`bun run commit`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
[SALAH](mailto:salah.dev@gmail.com)
</div>

<div align="center">
Made with ❤️ for the Muslim community
</div>
