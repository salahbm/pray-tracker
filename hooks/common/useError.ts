import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';
import { StatusCode, MessageCodes } from '@/utils/status';

export const useError = () => {
  const { t } = useTranslation();
  const statusPath = 'Responses.StatusCode';
  const messagesPath = 'Responses.MessageCodes';

  const errorHandler = useCallback(
    (error: ErrorData) => {
      const { description, message, code, status } = error;

      if (!status && !code) return;

      if (
        status === StatusCode.INTERNAL_ERROR ||
        code === MessageCodes.TOO_MANY_REQUESTS ||
        code === 2105
      ) {
        fireToast.error(
          t(`${messagesPath}.${code || status}`, { defaultValue: message }),
        );
        return;
      }

      if (code >= 2000 && code < 7000) {
        fireToast.error(
          t(`${messagesPath}.${code}`, { defaultValue: message }),
        );
        return;
      }

      fireToast.error(
        t(`${statusPath}.${status}`, { defaultValue: description }),
      );
    },
    [t],
  );

  return { errorHandler };
};
