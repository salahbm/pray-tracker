import React, { PropsWithChildren, useEffect, useState } from 'react';
import i18n from '@/i18n.config';
import { z } from 'zod/v4';
import { useLanguage } from '@/hooks/common/useTranslation';
import { uzLocale } from '@/utils/uz.zod';

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

    try {
      if (currentLanguage === 'uz') {
        z.config({ localeError: uzLocale() });
      } else if (z.locales && z.locales[currentLanguage as keyof typeof z.locales]) {
        z.config(z.locales[currentLanguage as keyof typeof z.locales]());
      } else {
        // Fallback to English if locale not found
        if (z.locales && z.locales['en']) {
          z.config(z.locales['en']());
        }
      }
    } catch (error) {
      console.error(`Failed to set Zod error map for locale '${currentLanguage}':`, error);
      // Continue without custom error map
    }
  }, [currentLanguage]);

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
