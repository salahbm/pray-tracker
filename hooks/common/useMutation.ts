import {
  type MutationFunction,
  type UseMutationResult,
  type UseMutationOptions,
  useMutation as useDefaultMutation,
} from '@tanstack/react-query';

import { ErrorData } from '@/types/api';

export type IMutationOptions<T, V = T> = Omit<
  UseMutationOptions<T, ErrorData, V>,
  'queryKey' | 'queryFn'
>;

type UseMutationProps<TData, TVariables> = {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: IMutationOptions<TData, TVariables>;
};

const useMutation = <TData, TVariables = TData>({
  mutationFn,
  options,
}: UseMutationProps<TData, TVariables>): UseMutationResult<
  TData,
  ErrorData,
  TVariables
> => useDefaultMutation({ mutationFn, ...options });

export default useMutation;
