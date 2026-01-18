/**
 * Standard API success response format
 * Matches backend ApiResponse interface
 */
export interface ApiResponse<T> {
  message?: string // Optional success message (e.g., "Success")
  data: T
}

/**
 * Paginated API response format
 * Matches backend PaginatedResponse interface
 */
export interface ApiPaginatedApiResponse<T> {
  message?: string // Optional success message
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export interface ApiErrorResponse {
  error: {
    code: number
    message: string
    status: number
    timestamp: string
  }
  status: number
  url: string
}

/**
 * API Error class for better error handling
 * Matches backend ErrorResponse format
 */
export class ApiError extends Error {
  public readonly status: number
  public readonly code: number
  public readonly timestamp: string
  public readonly message: string
  public readonly url: string

  constructor(response: ApiErrorResponse) {
    super(response.error.message)
    this.name = "ApiError"
    this.status = response.status
    this.code = response.error.code
    this.timestamp = response.error.timestamp
    this.message = response.error.message
    this.url = response.url

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
  }

  /**
   * Custom JSON serialization for proper logging
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      timestamp: this.timestamp,
      url: this.url,
    }
  }
}
