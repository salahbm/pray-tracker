# Pagination and Localization System

This document explains the pagination utilities and multi-language error handling system in the Pray Tracker backend.

## Overview

The backend includes:

1. **Pagination Utilities** - Standardized pagination for list endpoints
2. **Response Utilities** - Consistent API response format
3. **Localized Error Messages** - Multi-language support (en, uz, ru, kr)
4. **Global Exception Filter** - Automatic error localization based on request headers

## Supported Languages

- `en` - English (default)
- `uz` - Uzbek
- `ru` - Russian
- `kr` - Korean

## File Structure

```
src/common/
├── utils/
│   ├── pagination.utils.ts    # Pagination helpers
│   ├── response.utils.ts      # Response formatting
│   └── index.ts               # Barrel export
├── i18n/
│   ├── error-messages.ts      # Localized error messages
│   └── index.ts               # Barrel export
└── filters/
    ├── http-exception.filter.ts  # Global exception handler
    └── index.ts                  # Barrel export
```

## Pagination

### Pagination Utilities

The pagination system provides consistent pagination across all list endpoints.

#### Types

```typescript
interface PaginationParams {
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
```

#### Functions

**`parsePaginationParams(query)`**

- Parses page and limit from query parameters
- Returns: `{ skip, take, page }`
- Default: page=1, limit=10
- Max limit: 100

**`createPaginatedResponse(data, total, page, limit)`**

- Creates a standardized paginated response
- Returns: `{ data, meta }`

**`calculatePaginationMeta(total, page, limit)`**

- Calculates pagination metadata
- Returns: `PaginationMeta`

### Usage Example

```typescript
import {
  parsePaginationParams,
  createPaginatedResponse,
} from '@/common/utils';

@Get()
async findAll(
  @Query('page') page?: string,
  @Query('limit') limit?: string,
  @Query('search') search?: string,
) {
  // Parse pagination params
  const { skip, take, page: currentPage } = parsePaginationParams({
    page,
    limit,
  });

  // Build where clause
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : undefined;

  // Fetch data and count in parallel
  const [users, total] = await Promise.all([
    this.usersService.findAll({
      skip,
      take,
      where,
      orderBy: { createdAt: 'desc' },
    }),
    this.usersService.count(where),
  ]);

  // Return paginated response
  return createPaginatedResponse(users, total, currentPage, take);
}
```

### API Request Example

```bash
# Get page 1 with 10 items
GET /users?page=1&limit=10

# Get page 2 with 20 items and search
GET /users?page=2&limit=20&search=john
```

### API Response Example

```json
{
  "data": [
    {
      "id": "user-1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Response Utilities

### Types

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}
```

### Functions

**`createSuccessResponse(data, message?)`**

- Creates a standardized success response
- Returns: `{ success: true, data, message? }`

**`createErrorResponse(error, message, statusCode, path?)`**

- Creates a standardized error response
- Returns: `ErrorResponse`

**`getLocaleFromRequest(headers)`**

- Extracts locale from request headers
- Checks: `accept-language` or `locale` header
- Returns: `'en' | 'uz' | 'ru' | 'kr'`
- Default: `'en'`

## Localization

### How It Works

1. **Client sends locale** in request header:

   ```
   Accept-Language: uz
   # or
   Locale: ru
   ```

2. **Global exception filter** catches all errors

3. **Filter extracts locale** from request headers

4. **Error message is localized** based on locale

5. **Localized response** is sent to client

### Supported Error Keys

All error messages are defined in `error-messages.ts`:

- `UNAUTHORIZED` - Unauthorized access
- `FORBIDDEN` - Access forbidden
- `NOT_FOUND` - Resource not found
- `BAD_REQUEST` - Bad request
- `INTERNAL_SERVER_ERROR` - Internal server error
- `VALIDATION_ERROR` - Validation error
- `USER_NOT_FOUND` - User not found
- `USER_ALREADY_EXISTS` - User already exists
- `INVALID_CREDENTIALS` - Invalid email or password
- `SESSION_EXPIRED` - Session expired
- `NO_ACTIVE_SESSION` - No active session found
- `INVALID_TOKEN` - Invalid or expired token
- `EMAIL_ALREADY_EXISTS` - Email already exists
- `WEAK_PASSWORD` - Password too weak
- `INVALID_EMAIL` - Invalid email format
- `REQUIRED_FIELD` - Required field missing
- `INVALID_INPUT` - Invalid input provided

### Adding New Error Messages

1. Add error key to `ErrorKey` type:

```typescript
export type ErrorKey = 'EXISTING_KEY' | 'NEW_ERROR_KEY';
```

2. Add translations to `ERROR_MESSAGES`:

```typescript
export const ERROR_MESSAGES: ErrorMessages = {
  // ... existing messages
  NEW_ERROR_KEY: {
    en: 'Error message in English',
    uz: "Xato xabari o'zbekcha",
    ru: 'Сообщение об ошибке на русском',
    kr: '한국어 오류 메시지',
  },
};
```

### Using Localized Errors in Code

The global exception filter automatically handles localization. Just throw standard NestJS exceptions:

```typescript
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

// Throws localized error
throw new NotFoundException('User not found');

// Throws localized error
throw new UnauthorizedException('No active session found');
```

### Custom Error Messages

For custom error messages, you can use the error message functions:

```typescript
import { getLocalizedMessage } from '@/common/i18n';
import { getLocaleFromRequest } from '@/common/utils';

const locale = getLocaleFromRequest(request.headers);
const message = getLocalizedMessage('USER_NOT_FOUND', locale);

throw new NotFoundException(message);
```

## Testing Localization

### English (default)

```bash
curl -X GET http://localhost:4000/users/invalid-id \
  -H "Accept-Language: en"
```

Response:

```json
{
  "success": false,
  "error": "NotFoundException",
  "message": "Resource not found",
  "statusCode": 404,
  "timestamp": "2025-01-15T10:00:00.000Z",
  "path": "/users/invalid-id"
}
```

### Uzbek

```bash
curl -X GET http://localhost:4000/users/invalid-id \
  -H "Accept-Language: uz"
```

Response:

```json
{
  "success": false,
  "error": "NotFoundException",
  "message": "Resurs topilmadi",
  "statusCode": 404,
  "timestamp": "2025-01-15T10:00:00.000Z",
  "path": "/users/invalid-id"
}
```

### Russian

```bash
curl -X GET http://localhost:4000/users/invalid-id \
  -H "Accept-Language: ru"
```

Response:

```json
{
  "success": false,
  "error": "NotFoundException",
  "message": "Ресурс не найден",
  "statusCode": 404,
  "timestamp": "2025-01-15T10:00:00.000Z",
  "path": "/users/invalid-id"
}
```

### Korean

```bash
curl -X GET http://localhost:4000/users/invalid-id \
  -H "Accept-Language: kr"
```

Response:

```json
{
  "success": false,
  "error": "NotFoundException",
  "message": "리소스를 찾을 수 없습니다",
  "statusCode": 404,
  "timestamp": "2025-01-15T10:00:00.000Z",
  "path": "/users/invalid-id"
}
```

## Frontend Integration

### Setting Locale Header

**React/Next.js Example:**

```typescript
// Using fetch
const response = await fetch('/api/users', {
  headers: {
    'Accept-Language': userLocale, // 'en', 'uz', 'ru', or 'kr'
  },
});

// Using axios
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Accept-Language': userLocale,
  },
});
```

**Axios Interceptor:**

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add locale to every request
api.interceptors.request.use((config) => {
  const locale = localStorage.getItem('locale') || 'en';
  config.headers['Accept-Language'] = locale;
  return config;
});

export default api;
```

## Best Practices

### Pagination

1. **Always use pagination** for list endpoints
2. **Set reasonable limits** (max 100 items per page)
3. **Include search/filter** in count queries
4. **Fetch data and count in parallel** using `Promise.all()`
5. **Return consistent response format** using utilities

### Localization

1. **Always throw standard exceptions** - Let the filter handle localization
2. **Use error keys** instead of hardcoded messages
3. **Add all supported languages** when adding new errors
4. **Test with all locales** before deploying
5. **Keep messages concise** and user-friendly

### Response Format

1. **Use utility functions** for consistent responses
2. **Include timestamps** in error responses
3. **Provide request path** in errors for debugging
4. **Return meaningful status codes**
5. **Keep response structure flat** and simple

## Summary

You now have a complete pagination and localization system:

✅ **Pagination utilities** for consistent list endpoints
✅ **Response utilities** for standardized API responses  
✅ **Multi-language support** (en, uz, ru, kr)
✅ **Global exception filter** for automatic error localization
✅ **Locale detection** from request headers
✅ **Extensible error messages** system

All endpoints automatically support localization based on the `Accept-Language` or `Locale` header sent by the frontend.
