import { useQueryClient } from '@tanstack/react-query';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';

import useMutation from '../common/useMutation';
import { userKeys } from '@/constants/query-keys';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? '',
    redirectTo,
  );

  if (res.type === 'success') {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

export const useOAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: performOAuth,
    options: {
      onSuccess: async () => {
        queryClient.invalidateQueries(userKeys);
        fireToast.success('Welcome back. ');
      },
    },
  });
};
