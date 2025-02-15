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
            if (!isErrorData(error)) {
              console.error('Error in mutation:', error);
              fireToast.error(
                error instanceof Error ? error.message : 'Mutation error',
              );
              return;
            }

            if (error.code !== MessageCodes.CREATED) {
              errorHandler(error);
            }
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
