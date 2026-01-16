import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { fireToast } from '@/providers/toaster';
import { IErrorResponse } from '@/types/api';
import { alert } from '@/store/defaults/use-alert-store';
import { router } from 'expo-router';

export const useError = () => {
  const { t } = useTranslation('common');

  const errorHandler = useCallback(
    (error: IErrorResponse) => {
      const { message, statusCode } = error;

      console.log(`🚀 ~ error:`, error);

      // Handle alert-only statuses
      if ([400, 404, 500].includes(statusCode)) {
        alert({
          title: t(`errors.${statusCode}.title`),
          subtitle: t(`errors.${statusCode}.message`),
          cancelLabel: t('actions.ok'),
          confirmLabel: t('actions.sendInquiry'),
          onConfirm: () => router.push('/profile/inquiries'),
        });
        return;
      }

      // Special network failure case
      if (message === 'Application failed to respond') return;

      // Everything else → toast
      fireToast.error(message);
    },
    [t]
  );

  return { errorHandler };
};
