# 🚀 Prayer Tracker Backend

Backend service for the Prayer Tracker application, built with Bun and Express.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime
- **Framework**: Express.js
- **Language**: TypeScript
- **API**: REST

## 🔧 Prerequisites

- Bun >= 1.0.0
- Node.js >= 18

## 📦 Installation

1. Install dependencies:

```bash
bun install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🚀 Development

Start the development server with hot reload:

```bash
bun --watch src/index.ts
```

## 📝 Available Scripts

- `bun start`: Start the production server
- `bun dev`: Start development server with hot reload
- `bun test`: Run tests
- `bun lint`: Lint the codebase
- `bun build`: Build for production

## 📁 Project Structure

```bash
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/      # Business logic
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## 🔒 Environment Variables

```env
PORT=3000
NODE_ENV=development
# Add other environment variables
```

## 📚 API Documentation

API endpoints will be documented here once implemented.

## 🧪 Testing

```bash
bun test
```

## 📄 License

MIT © [SALAH](mailto:salah.dev@gmail.com)
