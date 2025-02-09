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
              fireToast.error(error.message);
              return;
            }

            if (error.code === 1001) return;

            if (error.code === 9999) {
              errorHandler(error);
              return;
            }

            if (query.state.data === undefined) {
              fireToast.error(`Something went wrong: ${error.message}`);
              return;
            }

            if (query.state.data !== undefined) {
              fireToast.error(
                `Something went wrong on background fetching: ${error.message}`,
              );
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (!isErrorData(error)) {
              console.error('error in mutation', error);
              fireToast.error(error.message);
              return;
            }

            if (error.code === 1001) return;

            if (error.description) {
              errorHandler(error);
            }
          },
          onSuccess: (response: {
            status: StatusCode;
            message: string;
            code: MessageCodes;
          }) => {
            console.log('mutation success', response);
            if (response) {
              fireToast.success(
                `${response.message}: ${response.code ?? 'SUCCESS'}`,
              );
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
