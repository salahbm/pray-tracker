import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { fireToast } from '@/providers/toaster';
import { IErrorResponse } from '@/types/api';

export const useError = () => {
  const { t } = useTranslation();

  const errorHandler = useCallback(
    (error: IErrorResponse) => {
      console.log('🚀 ~ file: useError.ts:12 ~ error:', error);
      const { message, statusCode: _ } = error;

      fireToast.error(message);
    },
    [t]
  );

  return { errorHandler };
};
