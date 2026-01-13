import { ConfigService } from '@nestjs/config';
import { I18nOptionsWithoutResolvers } from 'nestjs-i18n';
import path from 'path';
import { GlobalConfig } from '@/config/config.type';
import { existsSync } from 'fs';

function useI18nFactory(
  configService: ConfigService<GlobalConfig>,
): I18nOptionsWithoutResolvers {
  const env = configService.get('app.nodeEnv', { infer: true });
  const isLocal = env === 'test';
  const isDevelopment = env === 'development';

  // Resolve translations path safely for both dev (src) and prod (dist)
  // In development, we're in apps/backend/src
  // In production, we're in apps/backend/dist
  const distPath = path.join(__dirname, 'i18n', 'translations');
  const srcPath = path.join(process.cwd(), 'src/i18n/translations');
  const altSrcPath = path.join(process.cwd(), 'src/i18n/translations');

  let translationsPath = srcPath;
  if (existsSync(distPath)) {
    translationsPath = distPath;
  } else if (existsSync(altSrcPath)) {
    translationsPath = altSrcPath;
  }

  return {
    fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
      infer: true,
    }),

    loaderOptions: {
      path: translationsPath,
      watch: isLocal || isDevelopment,
    },

    // Types are always generated into src, not dist
    typesOutputPath: path.join(
      process.cwd(),
      'src/generated/i18n.generated.ts',
    ),

    logging: isLocal || isDevelopment,
  };
}

export default useI18nFactory;
