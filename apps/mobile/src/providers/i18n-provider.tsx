import { PropsWithChildren, useEffect, useState } from 'react';

import i18n from '@/i18n.config';

export function I18nProvider({ children }: PropsWithChildren) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      await i18n.init();
      setIsI18nInitialized(true);
    };

    initializeI18n();
  }, []);

  if (!isI18nInitialized) {
    // You can return a loading spinner or null here
    return null;
  }

  return <>{children}</>;
}
