/* eslint-disable no-unsafe-optional-chaining */
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { router } from 'expo-router';
import { PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useError } from '@/hooks/common/useError';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { MessageCodes, StatusCode } from '@/utils/status';

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
          mutations: {
            retry: 0,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.info(
              ` Error in query: ${JSON.stringify(query.queryKey)}`,
              error,
            );

            const errorMessage =
              query.state.data === undefined
                ? `Error: ${error.message}`
                : `Background fetching error: ${error.message}`;

            if ((error as { status?: number })?.status !== 500) {
              fireToast.error(errorMessage);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            console.info('Mutation error:', error ?? 'Unknown error');

            // Check if error is an AuthSessionMissingError
            if (
              'details' in error &&
              (error?.details as unknown as { name: string })?.name ===
                'AuthSessionMissingError'
            ) {
              clearUserAndSession();
              router.replace('/(tabs)');
              return;
            }

            // Ensure error is an instance of ApiError
            if (
              error &&
              'code' in error &&
              'status' in error &&
              'details' in error
            ) {
              return errorHandler({
                message: error.message,
                code: error?.code as number,
                status: error?.status as StatusCode,
                description: error.details as string,
              });
            }

            // If error is not ApiError, handle it as a generic error
            const errMessage =
              error instanceof Error && error?.message
                ? error?.message
                : 'An unknown error occurred';

            return errorHandler({
              message: errMessage,
              code: MessageCodes.SOMETHING_WENT_WRONG,
              status: StatusCode.INTERNAL_ERROR,
              description: errMessage,
            });
          },

          onSuccess: (res: {
            status: StatusCode;
            message: string;
            code: MessageCodes;
          }) => {
            console.info('Mutation success:', res);
            if (res && 'code' in res) {
              fireToast.success(t(`Responses.MessageCodes.${res?.code}`));
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
