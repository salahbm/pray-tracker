# Prayer Tracker API Architecture Documentation

## Overview

This document outlines the complete architecture for the Prayer Tracker backend API service. The application is designed to handle user prayers, friend relationships, awards, and prayer statistics.

## Database Models

### 1. User Model

```prisma
model User {
  id            String    // Primary identifier
  supabaseId    String    // Authentication ID
  email         String
  username      String
  firstName     String?
  lastName      String?
  photo         String?
  totalPoints   Int
  deviceToken   String?   // For push notifications
  isPro         Boolean   // Premium user status
  proUntil      DateTime? // Premium subscription end date
}
```

### 2. Prayers Model

```prisma
model Prays {
  id        String
  userId    String
  date      DateTime
  fajr      Int      // 0: Not prayed, 1: Late, 2: On time
  dhuhr     Int
  asr       Int
  maghrib   Int
  isha      Int
  nafl      Int      // Optional prayers count
}
```

## API Endpoints Structure

### 1. Authentication Endpoints

```
POST /api/auth/login
- Purpose: Authenticate user and generate JWT token
- Body: { email, password }
- Response: { token, user }

POST /api/auth/register
- Purpose: Create new user account
- Body: { email, password, username }
- Response: { token, user }

POST /api/auth/logout
- Purpose: Invalidate user session
- Headers: Authorization Bearer Token
- Response: { success: true }
```

### 2. Prayer Endpoints

```
GET /api/prayers/:userId/today
- Purpose: Fetch today's prayer records
- Headers: Authorization Bearer Token
- Response: {
    fajr: number,
    dhuhr: number,
    asr: number,
    maghrib: number,
    isha: number,
    nafl: number
  }

POST /api/prayers/:userId/post
- Purpose: Update prayer status
- Headers: Authorization Bearer Token
- Body: {
    prayerName: string,
    status: number,
    date: string
  }
- Response: { success: true, prayer: Prayer }
```

### 3. Friends Endpoints

```
GET /api/friends/approved
- Purpose: Get list of approved friends
- Headers: Authorization Bearer Token
- Response: { friends: Friend[] }

GET /api/friends/pending
- Purpose: Get pending friend requests
- Headers: Authorization Bearer Token
- Response: { requests: Friend[] }

POST /api/friends/request
- Purpose: Send friend request
- Headers: Authorization Bearer Token
- Body: { friendId: string }
- Response: { success: true }

POST /api/friends/approve
- Purpose: Accept friend request
- Headers: Authorization Bearer Token
- Body: { requestId: string }
- Response: { success: true }

DELETE /api/friends/reject
- Purpose: Reject friend request
- Headers: Authorization Bearer Token
- Body: { requestId: string }
- Response: { success: true }
```

## Backend Implementation Guide

### 1. Project Structure

```
src/
├── controllers/
│   ├── auth.controller.ts    - Authentication logic
│   ├── prayer.controller.ts  - Prayer management
│   ├── friend.controller.ts  - Friend relationships
│   └── award.controller.ts   - Awards management
├── middleware/
│   ├── auth.middleware.ts    - JWT verification
│   ├── validation.ts         - Request validation
│   └── error-handler.ts      - Global error handling
├── services/
│   ├── prayer.service.ts     - Prayer business logic
│   ├── friend.service.ts     - Friend management logic
│   └── notification.service.ts- Push notification handling
└── utils/
    ├── jwt.ts               - JWT helper functions
    ├── password.ts          - Password hashing
    └── date-utils.ts        - Date manipulation helpers
```

### 2. Authentication Implementation

```typescript
// middleware/auth.middleware.ts
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

### 3. Prayer Controller Example

```typescript
// controllers/prayer.controller.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PrayerController {
  static async getTodaysPrayers(req, res) {
    try {
      const { userId } = req.params;
      const today = new Date();

      const prayers = await prisma.prays.findFirst({
        where: {
          userId,
          date: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
      });

      res.json({ success: true, data: prayers });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
```

## Error Handling

### 1. Global Error Handler

```typescript
// middleware/error-handler.ts
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    statusCode: err.status || 500,
  });
};
```

### 2. Custom Error Classes

```typescript
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
```

## Security Best Practices

1. **Input Validation**

   - Use Zod or Joi for request validation
   - Sanitize all user inputs
   - Validate request parameters

2. **Authentication**

   - Use JWT tokens with expiration
   - Implement refresh token mechanism
   - Store hashed passwords only

3. **Rate Limiting**

   - Implement rate limiting per IP/user
   - Set appropriate limits for each endpoint
   - Add retry-after headers

4. **Data Protection**
   - Use HTTPS only
   - Implement CORS properly
   - Encrypt sensitive data

## Environment Variables

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/prayer_tracker

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Push Notifications
EXPO_ACCESS_TOKEN=your-expo-token
```

## API Response Format

All API responses should follow this standard format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}
```

## Testing Strategy

1. **Unit Tests**

   - Test individual components
   - Mock database calls
   - Test error handling

2. **Integration Tests**

   - Test API endpoints
   - Test database interactions
   - Test authentication flow

3. **E2E Tests**
   - Test complete user flows
   - Test real database interactions
   - Test third-party integrations

## Deployment Considerations

1. **Database Migration**

   - Use Prisma migrations
   - Back up data regularly
   - Plan for zero-downtime updates

2. **Monitoring**

   - Implement logging
   - Set up error tracking
   - Monitor performance metrics

3. **Scaling**
   - Use load balancing
   - Implement caching
   - Optimize database queries

## Next Steps

1. Set up the development environment
2. Create the database and run migrations
3. Implement authentication system
4. Build core API endpoints
5. Add validation and error handling
6. Implement testing
7. Set up CI/CD pipeline
8. Deploy to production

Remember to maintain proper documentation and follow coding standards throughout the development process.
