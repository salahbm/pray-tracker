import BottomSheet from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';
import { AnimatePresence, MotiView } from 'moti';
import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { useOnboarding } from '@/hooks/onboarding/use-onboarding';
import {
  useOnboardingStore,
  type LearnIslam,
  type PrayerKnowledge,
  type SupportNeeded,
  type WhyHereOption,
  type WhereDidYouHearAboutUs,
} from '@/store/onboarding/onboarding-store';

import { onboardingIllustrations, onboardingLotties } from './onboarding-assets';
import onboardingSteps from './steps.json';
import {
  type OnboardingChoiceStep,
  type OnboardingData,
  type OnboardingPermissionStep,
  type OnboardingStep,
  type OnboardingWelcomeStep,
} from './onboarding-types';
import {
  getChoiceSelectedValues,
  getInitialStepIndex,
  getMainSteps,
  getPermissionFeedback,
  getPrimaryCtaLabel,
  getSecondaryCtaLabel,
  getSplashStep,
  replaceAppName,
  resolveOptionFeedback,
} from './onboarding-utils';
import { OnboardingChoiceStep as ChoiceStep } from '@/components/views/onboarding/onboarding-choice-step';
import { OnboardingFinalStep } from '@/components/views/onboarding/onboarding-final-step';
import { OnboardingFooter } from '@/components/views/onboarding/onboarding-footer';
import { OnboardingModal } from '@/components/views/onboarding/onboarding-modal';
import { OnboardingPermissionStep as PermissionStep } from '@/components/views/onboarding/onboarding-permission-step';
import { OnboardingShell } from '@/components/views/onboarding/onboarding-shell';
import { OnboardingSplashStep } from '@/components/views/onboarding/onboarding-splash-step';
import { OnboardingWelcomeStep } from '@/components/views/onboarding/onboarding-welcome-step';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { FLAGS, Language, LANGUAGES } from '@/components/shared/language';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import { useLanguage } from '@/hooks/common/useTranslation';
import { useThemeStore } from '@/store/defaults/theme';

const onboardingData = onboardingSteps as OnboardingData;

const Onboarding = () => {
  const appName = Constants.expoConfig?.name ?? 'Noor';
  const steps = onboardingData.steps;
  const mainSteps = getMainSteps(steps);
  const splashStep = getSplashStep(steps);
  const sharedText = onboardingData.sharedText;
  const initialIndex = getInitialStepIndex(
    mainSteps,
    useOnboardingStore.getState().currentStep
  );

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [feedback, setFeedback] = useState<{ title?: string; body?: string }>({});
  const [attributionOtherText, setAttributionOtherText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showClosingSplash, setShowClosingSplash] = useState(false);

  const {
    prayerKnowledge,
    supportNeeded,
    learnIslam,
    whyHere,
    locationPermissionGranted,
    notificationPermissionGranted,
    locationCity,
    locationTimezone,
    whereDidYouHearAboutUs,
    enabledModules,
    defaultHomeTab,
    completedSteps,
    setCurrentStep,
    setPrayerKnowledge,
    setSupportNeeded,
    setLearnIslam,
    setWhyHere,
    setLocationPermission,
    setNotificationPermission,
    setWhereDidYouHearAboutUs,
    completeStep,
  } = useOnboardingStore();

  const onboardingMutation = useOnboarding();
  const friendsModalRef = useRef<BottomSheet>(null);
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);
  const settingsRef = useRef<BottomSheet>(null);
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();

  const activeStep = mainSteps[activeIndex] as OnboardingStep | undefined;

  const closeFriendsModal = () => friendsModalRef.current?.close();

  const personalizationPayload = useMemo(
    () => ({
      prayerKnowledge,
      supportNeeded,
      learnIslam,
      whyHere,
      locationPermissionGranted,
      notificationPermissionGranted,
      whereDidYouHearAboutUs,
      locationCity,
      locationTimezone,
      enabledModules,
      defaultHomeTab,
      completedSteps,
    }),
    [
      prayerKnowledge,
      supportNeeded,
      learnIslam,
      whyHere,
      locationPermissionGranted,
      notificationPermissionGranted,
      whereDidYouHearAboutUs,
      locationCity,
      locationTimezone,
      enabledModules,
      defaultHomeTab,
      completedSteps,
    ]
  );

  useEffect(() => {
    if (activeStep?.id) {
      setCurrentStep(activeStep.id);
      setFeedback({});
    }
  }, [activeStep?.id, setCurrentStep]);

  const persistPreferences = useCallback(async () => {
    setIsSaving(true);
    try {
      await onboardingMutation.mutateAsync(personalizationPayload);
    } finally {
      setIsSaving(false);
    }
  }, [onboardingMutation, personalizationPayload]);

  const handleSkip = async () => {
    await persistPreferences();
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (!activeStep) {
      return;
    }

    completeStep(activeStep.id);

    if (activeIndex < mainSteps.length - 1) {
      setActiveIndex(prev => prev + 1);
      return;
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleSingleChoice = (step: OnboardingChoiceStep, value: string) => {
    const selectedOption = step.content.options.find(option => option.id === value);
    const nextFeedback = resolveOptionFeedback(selectedOption);
    setFeedback(nextFeedback);

    if (step.id === 'prayer_knowledge') {
      setPrayerKnowledge(value as PrayerKnowledge);
    }

    if (step.id === 'support_needed') {
      setSupportNeeded(value as SupportNeeded);
      if (selectedOption?.onSelect?.action?.type === 'open_modal') {
        friendsModalRef.current?.snapToIndex(0);
      }
    }

    if (step.id === 'learn_islam') {
      setLearnIslam(value as LearnIslam);
    }

    if (step.id === 'attribution') {
      setWhereDidYouHearAboutUs(value as WhereDidYouHearAboutUs);
    }
  };

  const handleMultiChoice = (step: OnboardingChoiceStep, value: string[] | string) => {
    const nextValues = Array.isArray(value) ? value : [value];
    const lastSelected = Array.isArray(value) ? value[value.length - 1] : value;
    const selectedOption = step.content.options.find(option => option.id === lastSelected);

    if (selectedOption?.onSelect?.feedback) {
      setFeedback({ title: undefined, body: selectedOption.onSelect.feedback });
    }

    if (step.id === 'why_here') {
      setWhyHere(nextValues as WhyHereOption[]);
    }
  };

  const requestLocationPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== 'granted') {
      setLocationPermission(false);
      return;
    }

    const position = await Location.getCurrentPositionAsync({});
    const geocoded = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    const city = geocoded[0]?.city ?? geocoded[0]?.region ?? null;
    const timezone = Localization.getCalendars()[0]?.timeZone ?? null;

    setLocationPermission(true, city ?? undefined, timezone ?? undefined);
  };

  const requestNotificationPermission = async () => {
    const permission = await Notifications.requestPermissionsAsync();
    setNotificationPermission(permission.status === 'granted');
  };

  const handlePermissionPrimary = async (step: OnboardingPermissionStep) => {
    if (step.permissionKey === 'location') {
      await requestLocationPermission();
    }

    if (step.permissionKey === 'notifications') {
      await requestNotificationPermission();
    }

    const nextFeedback = getPermissionFeedback(step, 'allow');
    setFeedback(nextFeedback);
    handleNext();
  };

  const handlePermissionSecondary = (step: OnboardingPermissionStep) => {
    if (step.permissionKey === 'location') {
      setLocationPermission(false);
    }

    if (step.permissionKey === 'notifications') {
      setNotificationPermission(false);
    }

    const nextFeedback = getPermissionFeedback(step, 'deny');
    setFeedback(nextFeedback);
    handleNext();
  };

  const handleFinish = async () => {
    setShowClosingSplash(true);
    await persistPreferences();
    router.replace('/(tabs)');
  };

  const renderStep = () => {
    if (!activeStep) {
      return null;
    }

    if (activeStep.type === 'welcome') {
      const step = activeStep as OnboardingWelcomeStep;
      const lottieSource = onboardingLotties[step.ui.lottie.asset as keyof typeof onboardingLotties];
      return (
        <OnboardingWelcomeStep
          headline={step.content.headline}
          body={step.content.body}
          footnote={step.content.footnote}
          lottieSource={lottieSource}
          settings={{
            languageLabel: `${FLAGS[currentLanguage as keyof typeof FLAGS]} ${LANGUAGES[currentLanguage as keyof typeof LANGUAGES]}`,
            onLanguagePress: () => langRef.current?.snapToIndex(0),
            onThemePress: () => themeRef.current?.snapToIndex(0),
            themeColors: [
              colors['--primary'],
              colors['--background'],
              colors['--accent'],
              colors['--destructive'],
              colors['--foreground'],
            ],
          }}
        />
      );
    }

    if (activeStep.type === 'single_choice' || activeStep.type === 'multi_choice') {
      const step = activeStep as OnboardingChoiceStep;
      const selectedValues = getChoiceSelectedValues(step, {
        prayerKnowledge,
        supportNeeded,
        learnIslam,
        whyHere,
        whereDidYouHearAboutUs,
      });

      const isMultiple = step.type === 'multi_choice';
      const onChange = (value: string | string[]) => {
        if (isMultiple) {
          if (
            step.content.maxSelections &&
            Array.isArray(value) &&
            value.length > step.content.maxSelections
          ) {
            return;
          }
          handleMultiChoice(step, value);
        } else {
          handleSingleChoice(step, value as string);
        }
      };

      const optionalInputAction = step.content.options.find(
        option => option.id === 'other' && option.onSelect?.action?.type === 'optional_text_input'
      );
      const optionalField =
        optionalInputAction?.onSelect?.action?.type === 'optional_text_input'
          ? optionalInputAction.onSelect.action.field
          : null;

      return (
        <ChoiceStep
          headline={step.content.headline}
          body={step.content.body}
          options={step.content.options.map(option => ({
            id: option.id,
            label: option.label,
            feedback: option.onSelect?.feedback,
            feedbackTitle: option.onSelect?.feedbackTitle,
            feedbackBody: option.onSelect?.feedbackBody,
          }))}
          selected={selectedValues}
          onChange={onChange}
          multiple={isMultiple}
          footerNote={
            step.content.footerNote?.replace('{{sharedText.privacyNote}}', sharedText.privacyNote)
          }
          feedbackTitle={feedback.title}
          feedbackBody={feedback.body}
          optionalInput={
            optionalField && whereDidYouHearAboutUs === 'other'
              ? {
                  label: optionalField.label,
                  placeholder: optionalField.placeholder,
                  maxLength: optionalField.maxLength,
                  value: attributionOtherText,
                  onChange: setAttributionOtherText,
                }
              : undefined
          }
        />
      );
    }

    if (activeStep.type === 'permission') {
      const step = activeStep as OnboardingPermissionStep;
      const illustration =
        onboardingIllustrations[step.ui.illustration as keyof typeof onboardingIllustrations];
      return (
        <PermissionStep
          headline={step.content.headline}
          body={step.content.body}
          benefits={step.content.benefits}
          illustration={illustration}
        />
      );
    }

    if (activeStep.type === 'final') {
      const lottieSource =
        onboardingLotties[activeStep.ui.lottie.asset as keyof typeof onboardingLotties];
      return (
        <OnboardingFinalStep
          headline={activeStep.content.headline}
          body={activeStep.content.body}
          socialProof={activeStep.content.socialProof?.text}
          lottieSource={lottieSource}
        />
      );
    }

    return null;
  };

  const primaryCtaLabel = getPrimaryCtaLabel(activeStep, sharedText);
  const secondaryCtaLabel = getSecondaryCtaLabel(activeStep);

  const isPrimaryDisabled = () => {
    if (!activeStep) {
      return false;
    }

    if (activeStep.type === 'single_choice') {
      if (activeStep.id === 'prayer_knowledge') {
        return !prayerKnowledge;
      }
      if (activeStep.id === 'support_needed') {
        return !supportNeeded;
      }
      if (activeStep.id === 'learn_islam') {
        return !learnIslam;
      }
      if (activeStep.id === 'attribution') {
        return !whereDidYouHearAboutUs;
      }
    }

    if (activeStep.type === 'multi_choice') {
      const minSelections = activeStep.content.minSelections ?? 0;
      return whyHere.length < minSelections;
    }

    return false;
  };

  const shouldShowFooter = !!activeStep;
  const shouldShowHeader = !!activeStep;
  const shouldShowSkip = activeStep && activeStep.type !== 'final';

  const onPrimaryPress = async () => {
    if (!activeStep) {
      return;
    }

    if (activeStep.type === 'permission') {
      await handlePermissionPrimary(activeStep as OnboardingPermissionStep);
      return;
    }

    if (activeStep.type === 'final') {
      await handleFinish();
      return;
    }

    handleNext();
  };

  const onSecondaryPress = async () => {
    if (!activeStep) {
      return;
    }

    if (activeStep.type === 'permission') {
      handlePermissionSecondary(activeStep as OnboardingPermissionStep);
      return;
    }

    if (activeStep.type === 'final') {
      settingsRef.current?.snapToIndex(0);
    }
  };

  const friendsModal = onboardingData.modals.find(modal => modal.id === 'friends_motivation_modal');

  if (showClosingSplash && splashStep?.type === 'splash') {
    return (
      <OnboardingShell
        stepIndex={mainSteps.length}
        totalSteps={mainSteps.length}
        hideHeader
        hideProgress
        contentClassName="px-0 pb-0"
      >
        <OnboardingSplashStep
          headline={replaceAppName(splashStep.content.headline, appName)}
          subheadline={splashStep.content.subheadline}
          badge={splashStep.content.optionalBadge}
        />
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell
      stepIndex={activeIndex}
      totalSteps={mainSteps.length}
      onBack={activeIndex > 0 ? handleBack : undefined}
      onSkip={shouldShowSkip ? handleSkip : undefined}
      backLabel={sharedText.backCta}
      skipLabel={sharedText.skipCta}
      hideHeader={!shouldShowHeader}
      hideProgress={!shouldShowHeader}
    >
      <AnimatePresence exitBeforeEnter>
        <MotiView
          key={activeStep?.id}
          from={{ opacity: 0, translateX: 12 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: -12 }}
          transition={{ type: 'timing', duration: 220 }}
          className="flex-1"
        >
          {renderStep()}
        </MotiView>
      </AnimatePresence>
      {shouldShowFooter && (
        <OnboardingFooter
          primaryLabel={primaryCtaLabel}
          onPrimary={onPrimaryPress}
          secondaryLabel={secondaryCtaLabel}
          onSecondary={onSecondaryPress}
          primaryDisabled={isPrimaryDisabled()}
          isLoading={isSaving || onboardingMutation.isPending}
        />
      )}
      {friendsModal && (
        <OnboardingModal
          sheetRef={friendsModalRef}
          headline={friendsModal.content.headline}
          body={friendsModal.content.body}
          bullets={friendsModal.content.bullets}
          primaryCta={friendsModal.content.primaryCta}
          secondaryCta={friendsModal.content.secondaryCta}
          onPrimary={closeFriendsModal}
          onSecondary={closeFriendsModal}
        />
      )}
      <CustomBottomSheet sheetRef={themeRef} snapPoints={['80%']}>
        <ThemeSwitcher onClose={() => themeRef.current?.close()} />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={langRef} snapPoints={['80%']}>
        <Language onClose={() => langRef.current?.close()} />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={settingsRef} snapPoints={['85%']}>
        <View className="gap-6 px-5 pb-8">
          <ThemeSwitcher onClose={() => settingsRef.current?.close()} />
          <Language onClose={() => settingsRef.current?.close()} />
        </View>
      </CustomBottomSheet>
    </OnboardingShell>
  );
};

export default Onboarding;
