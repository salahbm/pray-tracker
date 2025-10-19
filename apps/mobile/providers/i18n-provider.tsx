import React, { PropsWithChildren, useEffect, useState } from 'react';
import i18n from '@/i18n.config';
import * as z from 'zod/v4';
import { useLanguage } from '@/hooks/common/useTranslation';

export function I18nProvider({ children }: PropsWithChildren) {
  const { currentLanguage } = useLanguage();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await i18n.init();
      setIsInitialized(true);
    };
    init();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    if (z.locales[currentLanguage as keyof typeof z.locales]) {
      z.config(z.locales[currentLanguage as keyof typeof z.locales]());
    } else {
      console.warn(`Locale '${currentLanguage}' not found in z.locales`);
      z.config(z.locales['en']());
    }
  }, [currentLanguage]);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
