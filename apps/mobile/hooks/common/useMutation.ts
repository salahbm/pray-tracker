import {
  type MutationFunction,
  useMutation as useDefaultMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';

export type IMutationOptions<T, V = T> = Omit<
  UseMutationOptions<T, Error, V>,
  'queryKey' | 'queryFn'
>;

type UseMutationProps<TData, TVariables> = {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: IMutationOptions<TData, TVariables>;
};

const useMutation = <TData, TVariables = TData>({
  mutationFn,
  options,
}: UseMutationProps<TData, TVariables>): UseMutationResult<TData, Error, TVariables> =>
  useDefaultMutation({ mutationFn, ...options });

export default useMutation;
