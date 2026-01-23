import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui/text';
import Animated, { FadeInDown } from 'react-native-reanimated';

type SubFooterProps = {
  handleRestore: () => void;
  purchasing: boolean;
};

const SubFooter: React.FC<SubFooterProps> = ({ handleRestore, purchasing }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Animated.View entering={FadeInDown.delay(700)} className=" mb-2">
        <TouchableOpacity
          onPress={handleRestore}
          disabled={purchasing}
          className="py-3 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-primary font-semibold">{t('subscription.restorePurchases')}</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(800)}
        className="mb-6 flex-row justify-center items-center gap-2 mt-2"
      >
        <TouchableOpacity
          onPress={() => Linking.openURL('https://noorapp.uz/privacy')}
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground text-xs font-semibold">
            {t('profile.navigation.privacySecurity')}
          </Text>
        </TouchableOpacity>

        <Text className="text-muted-foreground text-xs font-semibold">|</Text>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')
          }
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground text-xs font-semibold">
            {t('profile.navigation.termsConditions')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(900)} className="px-8 pb-10">
        <Text className="text-xs text-muted-foreground text-center leading-5">
          {t('subscription.terms')}
        </Text>
      </Animated.View>
    </Fragment>
  );
};

export { SubFooter };
