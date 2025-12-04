import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from 'expo-router';

import { useError } from '@/hooks/common/useError';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { ApiError } from '@/lib/agent'; // ✅ import ApiError
import { IErrorResponse, IResponse } from '@/types/api';

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { errorHandler } = useError();

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

            errorHandler(error as unknown as IErrorResponse);
          },
        }),

        // ✅ Catch mutation (POST/PUT/DELETE) errors globally
        mutationCache: new MutationCache({
          onError: error => {
            console.info('Mutation error:', error ?? 'Unknown error');

            // ✅ Handle known ApiError from agent.ts
            if (error instanceof ApiError) {
              return errorHandler(error as unknown as IErrorResponse);
            }

            return errorHandler(error as unknown as IErrorResponse);
          },

          // ✅ Handle success with toast feedback
          onSuccess: (data, variables: unknown, context: unknown) => {
            console.info('Mutation success:', data);
            if (!data) return;
            if ((data as IResponse<unknown>).success && (data as IResponse<unknown>)?.message) {
              fireToast.success((data as IResponse<unknown>).message ?? 'Success');
            }
          },
        }),
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
