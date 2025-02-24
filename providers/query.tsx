import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

import { useError } from '@/hooks/common/useError';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

const isErrorData = (error: unknown): error is ErrorData => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'description' in error &&
    'message' in error
  );
};

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
          mutations: {
            retry: 0,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (!isErrorData(error)) {
              fireToast.error(
                error instanceof Error
                  ? error.message
                  : 'An unknown error occurred',
              );
              return;
            }

            if (error.code === MessageCodes.SOMETHING_WENT_WRONG) {
              errorHandler(error);
              return;
            }

            const errorMessage =
              query.state.data === undefined
                ? `Something went wrong: ${error.message}`
                : `Background fetching error: ${error.message}`;

            fireToast.error(errorMessage);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            console.warn('Mutation error:', error ?? 'Unknown error');

            // Ensure error is an instance of ApiError
            if (error instanceof ApiError) {
              return errorHandler({
                message: error.message,
                code: error?.code,
                status: error?.status,
                description: error.details,
              });
            }

            // If error is not ApiError, handle it as a generic error
            const errMessage =
              error instanceof Error && error.message
                ? error.message
                : 'An unknown error occurred';

            return errorHandler({
              message: errMessage,
              code: MessageCodes.SOMETHING_WENT_WRONG,
              status: StatusCode.INTERNAL_ERROR,
              description: errMessage,
            });
          },

          onSuccess: ({
            message,
            code,
          }: {
            status: StatusCode;
            message: string;
            code: MessageCodes;
          }) => {
            if (message && code) {
              fireToast.success(`Responses.MessageCodes.${code}`);
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
