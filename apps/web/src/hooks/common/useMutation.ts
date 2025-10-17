'use client';

import {
  type MutationFunction,
  useMutation as useDefaultMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';

export type ErrorData = {
  code: string;
  message: string;
  details?: any;
};

export type IMutationOptions<T, V = T> = Omit<
  UseMutationOptions<T, ErrorData, V>,
  'queryKey' | 'queryFn'
>;

type UseMutationProps<TData, TVariables> = {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: IMutationOptions<TData, TVariables>;
};

export const useMutation = <TData, TVariables = TData>({
  mutationFn,
  options,
}: UseMutationProps<TData, TVariables>): UseMutationResult<TData, ErrorData, TVariables> =>
  useDefaultMutation({ mutationFn, ...options });
