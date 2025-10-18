# Authentication & User Management Setup

This document explains the authentication and user management setup in the Pray Tracker backend.

## Overview

The backend uses **Better Auth** for authentication with NestJS integration via `@thallesp/nestjs-better-auth`. The setup includes:

- Email/Password authentication
- Session-based authentication with cookies
- Protected routes using guards
- User management endpoints
- Prisma for database operations

## Architecture

### Better Auth Integration

Better Auth automatically handles the following routes under `/api/auth/*`:

- `POST /api/auth/sign-up/email` - Register new user
- `POST /api/auth/sign-in/email` - Sign in with email/password
- `POST /api/auth/sign-out` - Sign out (invalidate session)
- `GET /api/auth/session` - Get current session

### Custom Endpoints

#### Auth Endpoints (`/auth`)

- `GET /auth/me` - Get current authenticated user
- `POST /auth/signout` - Custom sign out endpoint
- `GET /auth/sessions` - List all active sessions

#### User Endpoints (`/users`)

All user endpoints are protected by `AuthGuard`:

- `GET /users/me` - Get current user profile
- `GET /users/me/stats` - Get current user statistics
- `PATCH /users/me` - Update current user profile
- `GET /users` - Get all users (with pagination & search)
- `GET /users/:id` - Get user by ID
- `GET /users/:id/stats` - Get user statistics by ID
- `PATCH /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## File Structure

```
src/
├── common/
│   └── guards/
│       └── auth.guard.ts          # Authentication guard
├── modules/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── signin.dto.ts      # Sign in validation
│   │   │   ├── signup.dto.ts      # Sign up validation
│   │   │   └── reset-pwd.dto.ts   # Password reset validation
│   │   ├── auth.controller.ts     # Custom auth endpoints
│   │   ├── auth.service.ts        # Auth business logic
│   │   └── auth.module.ts         # Auth module
│   └── users/
│       ├── dto/
│       │   ├── create-user.dto.ts # User creation validation
│       │   └── update-user.dto.ts # User update validation
│       ├── user.controller.ts     # User endpoints
│       ├── user.service.ts        # User business logic
│       └── user.module.ts         # User module
├── lib/
│   └── auth.ts                    # Better Auth configuration
└── main.ts                        # App entry point with validation pipe
```

## How It Works

### 1. Authentication Flow

1. **Sign Up**: User registers via Better Auth's `/api/auth/sign-up/email`
   - Requires: `name`, `email`, `password`
   - Better Auth creates user in database and returns session cookie

2. **Sign In**: User logs in via `/api/auth/sign-in/email`
   - Requires: `email`, `password`
   - Returns session cookie on success

3. **Protected Routes**: All requests to protected endpoints must include session cookie
   - `AuthGuard` validates the session using Better Auth
   - Attaches `user` and `session` to request object

### 2. Auth Guard

The `AuthGuard` protects routes by:

```typescript
@UseGuards(AuthGuard)
```

It validates the session cookie and attaches user info to the request:

```typescript
request['user']; // Current user object
request['session']; // Current session object
```

### 3. Validation

All DTOs use `class-validator` decorators for automatic validation:

```typescript
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  locale?: string;
}
```

The global `ValidationPipe` in `main.ts` automatically validates all incoming requests.

## Usage Examples

### Sign Up

```bash
curl -X POST http://localhost:4000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Sign In

```bash
curl -X POST http://localhost:4000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User

```bash
curl -X GET http://localhost:4000/auth/me \
  -b cookies.txt
```

### Update Current User Profile

```bash
curl -X PATCH http://localhost:4000/users/me \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "John Updated",
    "locale": "en"
  }'
```

### Get User Statistics

```bash
curl -X GET http://localhost:4000/users/me/stats \
  -b cookies.txt
```

### Search Users

```bash
curl -X GET "http://localhost:4000/users?search=john&take=10&skip=0" \
  -b cookies.txt
```

## Environment Variables

Required environment variables in `.env`:

```env
BETTER_AUTH_URL=http://localhost:4000
BETTER_AUTH_SECRET=your-secret-key-here
PUBLIC_API_PORT=4000
DATABASE_URL=your-database-url
```

## Security Features

1. **Session-based authentication** - Secure HTTP-only cookies
2. **Password validation** - Min 8, max 20 characters
3. **DTO validation** - Automatic request validation
4. **CORS protection** - Configured allowed origins
5. **Whitelist validation** - Strips unknown properties from requests

## Next Steps

To enhance the authentication system, consider:

1. **Email verification** - Enable `requireEmailVerification: true` in `lib/auth.ts`
2. **OAuth providers** - Add Google, GitHub, etc.
3. **Password reset** - Implement forgot password flow
4. **Role-based access control** - Add admin/user roles
5. **Rate limiting** - Protect against brute force attacks
6. **Refresh tokens** - Implement token refresh mechanism
7. **Two-factor authentication** - Add 2FA support

## Troubleshooting

### Session not persisting

- Ensure cookies are enabled in your client
- Check CORS configuration includes `credentials: true`
- Verify `BETTER_AUTH_URL` matches your frontend URL

### Validation errors

- Check DTO definitions match your request payload
- Ensure all required fields are provided
- Review validation pipe configuration in `main.ts`

### Database errors

- Run `prisma generate` after schema changes
- Ensure database migrations are up to date
- Check Prisma connection string in `.env`
