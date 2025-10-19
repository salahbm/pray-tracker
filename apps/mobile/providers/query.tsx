import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from 'expo-router';

import { useError } from '@/hooks/common/useError';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { MessageCodes, StatusCode } from '@/utils/status';
import { ApiError } from '@/lib/agent'; // ✅ import ApiError

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { errorHandler } = useError();
  const { clearUserAndSession } = useAuthStore();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
          mutations: { retry: 0 },
        },

        // ✅ Catch background query errors
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.info(`Error in query: ${JSON.stringify(query.queryKey)}`, error);

            const errorMessage =
              query.state.data === undefined
                ? `Error: ${error.message}`
                : `Background fetching error: ${error.message}`;

            if ((error as { status?: number })?.status !== 500) {
              fireToast.error(errorMessage);
            }
          },
        }),

        // ✅ Catch mutation (POST/PUT/DELETE) errors globally
        mutationCache: new MutationCache({
          onError: error => {
            console.info('Mutation error:', error ?? 'Unknown error');

            // Handle missing Auth session
            if (
              'details' in error &&
              (error?.details as unknown as { name: string })?.name === 'AuthSessionMissingError'
            ) {
              clearUserAndSession();
              router.replace('/(tabs)');
              return;
            }

            // ✅ Handle known ApiError from agent.ts
            if (error instanceof ApiError) {
              return errorHandler({
                message: error.message,
                code: (error.code as number) || MessageCodes.SOMETHING_WENT_WRONG,
                status: (error.status as StatusCode) || StatusCode.INTERNAL_ERROR,
                description:
                  typeof error.data === 'string'
                    ? error.data
                    : (error.data as any)?.message || error.message,
              });
            }

            // ✅ Fallback for unknown errors
            const errMessage =
              error instanceof Error && error.message ? error.message : 'An unknown error occurred';

            return errorHandler({
              message: errMessage,
              code: MessageCodes.SOMETHING_WENT_WRONG,
              status: StatusCode.INTERNAL_ERROR,
              description: errMessage,
            });
          },

          // ✅ Handle success with toast feedback
          onSuccess: (data: unknown, variables: unknown, context: unknown) => {
            console.info('Mutation success:', data);
            // Only show toast for responses with the expected success format
            const res = data as { status?: StatusCode; message?: string; code?: MessageCodes };
            if (res && 'code' in res && res.code) {
              fireToast.success(
                t(`Responses.MessageCodes.${res.code}`, { defaultValue: res.message })
              );
            }
          },
        }),
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
