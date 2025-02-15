import bigDecimal from 'js-big-decimal';
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

      if (status === StatusCode.INTERNAL_ERROR) {
        fireToast.error(
          t(`${statusPath}.${status}`, { defaultValue: message }),
        );
        return;
      }

      const errorCode = new bigDecimal(code || 0);

      if (
        errorCode.compareTo(new bigDecimal(4000)) >= 0 &&
        errorCode.compareTo(new bigDecimal(5000)) < 0
      ) {
        fireToast.error(
          t(`${messagesPath}.${code}`, { defaultValue: message }),
        );
        return;
      }

      if (code === MessageCodes.TOO_MANY_REQUESTS) {
        fireToast.error(
          t(`${messagesPath}.${code}`, { defaultValue: message }),
        );
        return;
      }

      if (code === 2105) {
        fireToast.error(
          t(`${messagesPath}.${code}`, { defaultValue: message }),
        );
        return;
      }

      if (code === 3700) return;

      fireToast.error(
        t(`${statusPath}.${status}`, { defaultValue: description }),
      );
    },
    [t],
  );

  return { errorHandler };
};
