import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { IErrorResponse } from '@/types/api';


export const useError = () => {
  const { t } = useTranslation();
  const { clearUserAndSession } = useAuthStore();


  const errorHandler = useCallback(
    (error: IErrorResponse) => {
      const { message, statusCode:_ } = error;

      fireToast.error(message);
    },
    [t]
  );

  return { errorHandler };
};
