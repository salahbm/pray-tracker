"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useEffect } from "react"

import { ApiError } from "@/lib/agent"
import { queryClient } from "@/lib/query-client"

/**
 * Determines if an error should be retried
 * Don't retry:
 * - Network errors (status 0) - connection failures
 * - Client errors (4xx) except 408 (Request Timeout) and 429 (Too Many Requests)
 */
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (error instanceof ApiError) {
    // Don't retry network errors (status 0) - these are connection failures
    // User needs to fix their network connection first
    if (error.status === 0) {
      return false
    }

    // Don't retry client errors (4xx) except specific cases
    if (error.status >= 400 && error.status < 500) {
      // Retry these specific client errors
      if (error.status === 408 || error.status === 429) {
        return failureCount < 3
      }
      // Don't retry other client errors (400, 401, 403, 404, etc.)
      return false
    }

    // Retry server errors (5xx)
    return failureCount < 3
  }
  // Don't retry unknown errors
  return false
}

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  //   const { errorHandler } = useError();

  // Configure query client with error handlers after hooks are initialized
  useEffect(() => {
    // Configure QueryCache to handle all query errors globally
    // This catches errors from useMe and other queries (e.g., 401 session expired)
    const queryCache = queryClient.getQueryCache()
    const mutationCache = queryClient.getMutationCache()

    // Set error handlers
    // queryCache.config.onError = errorHandler;
    // mutationCache.config.onError = errorHandler;

    // Configure default options with retry logic
    queryClient.setDefaultOptions({
      queries: {
        retry: shouldRetry,
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: shouldRetry,
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
        onSuccess: (data: unknown) => {
          if (process.env.NODE_ENV === "development") {
            console.info(`Mutation Success ✅:`, JSON.stringify({ hasData: !!data }, null, 2))
          }
        },
      },
    })

    // Cleanup: reset to no-op on unmount
    return () => {
      queryCache.config.onError = () => {
        // no-op
      }
      mutationCache.config.onError = () => {
        // no-op
      }
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
