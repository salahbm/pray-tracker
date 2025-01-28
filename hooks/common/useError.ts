import bigDecimal from 'js-big-decimal';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAlert } from '@/providers/alert';
import { fireToast } from '@/providers/toaster';
import { ErrorData } from '@/types/api';

export const useError = () => {
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const errorHandler = useCallback(
    (error: ErrorData, isToast?: boolean) => {
      const { description, message, code, status } = error;

      if (status === 500) {
        return showAlert(t('Errors.wrong'), '500 ERROR');
      }

      const error_code = code;
      const error_detail = description;

      // Errors related to orders (4000-5000 range)
      const errorCode = new bigDecimal(error_code || 0);
      if (
        errorCode.compareTo(new bigDecimal(4000)) >= 0 &&
        errorCode.compareTo(new bigDecimal(5000)) < 0
      ) {
        return fireToast.error(error_detail || message);
      }

      // Reset password token expired
      if (error_code === 2105) {
        return showAlert(t('Errors.wrong'), t(`Errors.${error_code}`));
      }

      // No action for error code 3700
      if (error_code === 3700) {
        return null;
      }

      // Handle errors based on isToast
      if (isToast) {
        return fireToast.error(t(`Errors.${error_code} ${error_detail}`));
      }

      return showAlert(t('Errors.wrong'), t(`Errors.${error_code}`));
    },
    [showAlert, t],
  );

  return { errorHandler };
};
