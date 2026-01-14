import BottomSheet from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';
import { AnimatePresence, MotiView } from 'moti';
import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useOnboarding } from '@/hooks/onboarding/use-onboarding';

import onboardingSteps from './steps.json';

import {
  OnboardingChoiceStep,
  OnboardingChoiceStepType,
  OnboardingDataType,
  OnboardingFinalStep,
  OnboardingFooter,
  OnboardingPermissionStep,
  OnboardingPermissionStepType,
  OnboardingShell,
  OnboardingSplashStep,
  OnboardingStepType,
  OnboardingWelcomeStep,
  OnboardingWelcomeStepType,
  useOnboarding as useOnboardingReducer,
  getChoiceSelectedValues,
  getInitialStepIndex,
  getMainSteps,
  getPermissionFeedback,
  getPrimaryCtaLabel,
  getSplashStep,
  replaceAppName,
  resolveOptionFeedback,
  PrayerKnowledge,
  SupportNeeded,
  LearnIslam,
  WhereDidYouHearAboutUs,
  WhyHereOption,
} from '@/components/views/onboarding';
import { gifs } from '@/constants/images';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth/auth-session';
import { useOnboardingStore } from '@/store/defaults/onboarding';
import { OnboardingPreferencePayload } from '@/types/onboarding';

const translateOnboardingData = (data: OnboardingDataType, translate: (key: string) => string) => {
  const translateValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(translateValue);
    }

    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, nestedValue]) => [key, translateValue(nestedValue)])
      );
    }

    if (typeof value === 'string' && value.startsWith('onboardingFlow.')) {
      return translate(value);
    }

    return value;
  };

  return translateValue(data) as OnboardingDataType;
};

const Onboarding = () => {
  const appName = Constants.expoConfig?.name ?? 'Noor';
  const { t } = useTranslation();
  const onboardingData = useMemo(
    () => translateOnboardingData(onboardingSteps as OnboardingDataType, t),
    [t]
  );
  const steps = onboardingData.steps;
  const mainSteps = getMainSteps(steps);
  const splashStep = getSplashStep(steps);
  const sharedText = onboardingData.sharedText;

  // Use reducer hook
  const {
    state,
    setCurrentStep,
    setPrayerKnowledge,
    setSupportNeeded,
    setLearnIslam,
    setWhyHere,
    setLocationPermission,
    setNotificationPermission,
    completeStep,
    setWhereDidYouHearAboutUs,
  } = useOnboardingReducer();

  // Get initial index from reducer state instead of Zustand
  const initialIndex = getInitialStepIndex(mainSteps, state.currentStep);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [feedback, setFeedback] = useState<{ title?: string; body?: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showClosingSplash, setShowClosingSplash] = useState(false);

  const user = useAuthStore(state => state.user);
  const { setPreferences, clearPreferences } = useOnboardingStore();

  const onboardingMutation = useOnboarding();
  const friendsModalRef = useRef<BottomSheet>(null);

  const activeStep = mainSteps[activeIndex] as OnboardingStepType | undefined;

  const closeFriendsModal = () => friendsModalRef.current?.close();

  useEffect(() => {
    if (activeStep?.id) {
      setCurrentStep(activeStep.id);
      setFeedback({});
    }
  }, [activeStep?.id, setCurrentStep]);

  const persistPreferences = useCallback(async () => {
    setIsSaving(true);
    try {
      const payload: OnboardingPreferencePayload = {
        prayerKnowledge: state.prayerKnowledge,
        supportNeeded: state.supportNeeded,
        learnIslam: state.learnIslam,
        whyHere: state.whyHere,
        locationPermissionGranted: state.locationPermissionGranted,
        notificationPermissionGranted: state.notificationPermissionGranted,
        whereDidYouHearAboutUs: state.whereDidYouHearAboutUs,
        locationCity: state.locationCity,
        locationTimezone: state.locationTimezone,
        enabledModules: state.enabledModules,
        defaultHomeTab: state.defaultHomeTab,
      };

      setPreferences(payload);

      if (user?.id) {
        await onboardingMutation.mutateAsync(payload);
        clearPreferences();
      }
    } finally {
      setIsSaving(false);
    }
  }, [onboardingMutation, state, user?.id, setPreferences, clearPreferences]);

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

  const handleSingleChoice = (step: OnboardingChoiceStepType, value: string) => {
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

  const handleMultiChoice = (step: OnboardingChoiceStepType, value: string[] | string) => {
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

  const handlePermissionPrimary = async (step: OnboardingPermissionStepType) => {
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

  const handleFinish = async () => {
    setShowClosingSplash(true);
    await persistPreferences();
    router.replace('/(tabs)');
  };

  const renderStep = useMemo(() => {
    if (!activeStep) {
      return null;
    }

    if (activeStep.type === 'welcome') {
      const step = activeStep as OnboardingWelcomeStepType;
      return (
        <OnboardingWelcomeStep
          headline={step.content.headline}
          body={step.content.body}
          footnote={step.content.footnote}
        />
      );
    }

    if (activeStep.type === 'single_choice' || activeStep.type === 'multi_choice') {
      const step = activeStep as OnboardingChoiceStepType;
      const selectedValues = getChoiceSelectedValues(step, {
        prayerKnowledge: state.prayerKnowledge,
        supportNeeded: state.supportNeeded,
        learnIslam: state.learnIslam,
        whyHere: state.whyHere,
        whereDidYouHearAboutUs: state.whereDidYouHearAboutUs,
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

      return (
        <OnboardingChoiceStep
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
          footerNote={step.content.footerNote?.replace(
            '{{sharedText.privacyNote}}',
            sharedText.privacyNote
          )}
          feedbackTitle={feedback.title}
          feedbackBody={feedback.body}
        />
      );
    }

    if (activeStep.type === 'permission') {
      const step = activeStep as OnboardingPermissionStepType;
      const illustration = gifs[step.ui.illustration as keyof typeof gifs];
      return (
        <OnboardingPermissionStep
          headline={step.content.headline}
          body={step.content.body}
          benefits={step.content.benefits}
          illustration={illustration}
        />
      );
    }

    if (activeStep.type === 'final') {
      const lottieSource = gifs[activeStep.ui.lottie.asset as keyof typeof gifs];
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
  }, [activeStep, state, feedback]);

  const primaryCtaLabel = getPrimaryCtaLabel(activeStep, sharedText);

  const isPrimaryDisabled = () => {
    if (!activeStep) {
      return false;
    }

    if (activeStep.type === 'single_choice') {
      if (activeStep.id === 'prayer_knowledge') {
        return !state.prayerKnowledge;
      }
      if (activeStep.id === 'support_needed') {
        return !state.supportNeeded;
      }
      if (activeStep.id === 'learn_islam') {
        return !state.learnIslam;
      }
      if (activeStep.id === 'attribution') {
        return !state.whereDidYouHearAboutUs;
      }
    }

    if (activeStep.type === 'multi_choice') {
      const minSelections = activeStep.content.minSelections ?? 0;
      return state.whyHere.length < minSelections;
    }

    return false;
  };

  const shouldShowFooter = !!activeStep;
  const shouldShowHeader = !!activeStep;

  const onPrimaryPress = async () => {
    if (!activeStep) {
      return;
    }

    if (activeStep.type === 'permission') {
      await handlePermissionPrimary(activeStep as OnboardingPermissionStepType);
      return;
    }

    if (activeStep.type === 'final') {
      await handleFinish();
      return;
    }

    handleNext();
  };

  const friendsModal = onboardingData.modals.find(modal => modal.id === 'friends_motivation_modal');

  if (showClosingSplash && splashStep?.type === 'splash') {
    return (
      <OnboardingSplashStep
        headline={replaceAppName(splashStep.content.headline, appName)}
        subheadline={splashStep.content.subheadline}
        badge={splashStep.content.optionalBadge}
      />
    );
  }

  return (
    <OnboardingShell
      stepIndex={activeIndex}
      totalSteps={mainSteps.length}
      onBack={activeIndex > 0 ? handleBack : undefined}
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
          {renderStep}
        </MotiView>
      </AnimatePresence>
      {shouldShowFooter && (
        <OnboardingFooter
          primaryLabel={primaryCtaLabel}
          onPrimary={onPrimaryPress}
          primaryDisabled={isPrimaryDisabled()}
          isLoading={isSaving || onboardingMutation.isPending}
        />
      )}
      <CustomBottomSheet
        sheetRef={friendsModalRef}
        snapPoints={['50%']}
        detached
        grabbable={false}
        opacity={0}
        bottomSheetStyle={{ marginHorizontal: 16 }}
        scrollClassName="bg-background border-2 border-border rounded-3xl"
      >
        {friendsModal && (
          <View className="py-8">
            <Text className="text-2xl font-semibold text-foreground mb-3">
              {friendsModal.content.headline}
            </Text>
            <Text className="text-base text-muted-foreground leading-relaxed">
              {friendsModal.content.body}
            </Text>
            {friendsModal.content.bullets && friendsModal.content.bullets.length > 0 && (
              <View className="mt-5">
                {friendsModal.content.bullets.map(bullet => (
                  <View key={bullet} className="flex-row items-start mb-3">
                    <View className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <Text className="ml-3 text-base text-foreground flex-1">{bullet}</Text>
                  </View>
                ))}
              </View>
            )}
            <View className="mt-6 gap-3">
              <Button onPress={closeFriendsModal} className="rounded-full" width="full">
                <Text>{friendsModal.content.primaryCta}</Text>
              </Button>
            </View>
          </View>
        )}
      </CustomBottomSheet>
    </OnboardingShell>
  );
};

export default Onboarding;
