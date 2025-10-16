import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';

import useMutation from '../common/useMutation';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

WebBrowser.maybeCompleteAuthSession(); // Required for web only

const redirectTo = makeRedirectUri({
  scheme: 'salahdev-prayer-tracker', // Your deep link scheme
  preferLocalhost: true, // Helps in local development
});

const createSessionFromUrl = async (url: string) => {
  // const { params, errorCode } = QueryParams.getQueryParams(url);
  // if (errorCode) {
  //   throw new ApiError({
  //     message: errorCode,
  //     status: StatusCode.UNAUTHORIZED,
  //     code: MessageCodes.INTERNAL_ERROR,
  //   });
  // }
  // const { access_token, refresh_token } = params;
  // if (!access_token) {
  //   throw new ApiError({
  //     message: 'Missing access token',
  //     status: StatusCode.UNAUTHORIZED,
  //     code: MessageCodes.INTERNAL_ERROR,
  //   });
  // }
  // // Set session with Supabase
  // const { data, error } = await supabase.auth.setSession({
  //   access_token,
  //   refresh_token,
  // });
  // if (error) {
  //   throw new ApiError({
  //     message: error?.message || 'Session refresh failed',
  //     status: StatusCode.INTERNAL_ERROR,
  //     code: MessageCodes.INTERNAL_ERROR,
  //   });
  // }
  // return data;
};

const performOAuth = async () => {
  // try {
  //   await supabase.auth.signOut(); // Ensure no stale session
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       redirectTo,
  //       skipBrowserRedirect: true,
  //     },
  //   });
  //   if (error || !data?.url) {
  //     throw new ApiError({
  //       message: error?.message || 'OAuth URL is missing',
  //       status: StatusCode.INTERNAL_ERROR,
  //       code: MessageCodes.INTERNAL_ERROR,
  //     });
  //   }
  //   const res = await WebBrowser.openAuthSessionAsync(
  //     data?.url ?? '',
  //     redirectTo,
  //   );
  //   if (res.type === 'success' && res.url) {
  //     const signedIn = await createSessionFromUrl(res.url);
  //     // ✅ Explicitly set the session in Supabase
  //     await supabase.auth.setSession(signedIn.session);
  //     return signedIn.user;
  //   }
  // } catch (error) {
  //   throw new ApiError({
  //     message: error?.message || 'OAuth failed',
  //     status: StatusCode.INTERNAL_ERROR,
  //     code: MessageCodes.INTERNAL_ERROR,
  //   });
  // }
};

export const useOAuth = () => {
  return useMutation({
    mutationFn: performOAuth,
  });
};

export { performOAuth };
