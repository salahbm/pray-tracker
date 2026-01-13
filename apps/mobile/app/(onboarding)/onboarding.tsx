import BottomSheet from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import * as Notifications from 'expo-notifications';
import { AnimatePresence, MotiView } from 'moti';
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
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

import onboardingAgent from './agent.json';
import {
  type OnboardingChoiceStepType,
  type OnboardingDataType,
  type OnboardingOptionType,
  type OnboardingPermissionStepType,
  type OnboardingStepType,
  type OnboardingWelcomeStepType,
  OnboardingChoiceStep,
  OnboardingFinalStep,
  OnboardingFooter,
  onboardingIllustrations,
  onboardingLotties,
  OnboardingModal,
  OnboardingPermissionStep,
  OnboardingShell,
  OnboardingSplashStep,
  OnboardingWelcomeStep,
} from '@/components/views/onboarding';

const onboardingData = onboardingAgent as OnboardingDataType;

const replaceAppName = (value: string, appName: string) =>
  value.replace(/\{\{APP_NAME\}\}/g, appName);

const resolveOptionFeedback = (option?: OnboardingOptionType) => {
  if (!option?.onSelect) {
    return { title: undefined, body: undefined };
  }

  return {
    title: option.onSelect.feedbackTitle,
    body: option.onSelect.feedbackBody ?? option.onSelect.feedback,
  };
};

const Onboarding = () => {
  const appName = Constants.expoConfig?.name ?? 'Noor';
  const steps = onboardingData.steps;
  const sharedText = onboardingData.sharedText;
  const initialIndex = Math.max(
    0,
    steps.findIndex(step => step.id === useOnboardingStore.getState().currentStep)
  );

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [feedback, setFeedback] = useState<{ title?: string; body?: string }>({});
  const [attributionOtherText, setAttributionOtherText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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

  const activeStep = steps[activeIndex] as OnboardingStepType | undefined;

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
    if (!activeStep) {
      return;
    }

    setCurrentStep(activeStep.id);
    setFeedback({});

    if (activeStep.type === 'splash') {
      const timer = setTimeout(() => {
        completeStep(activeStep.id);
        setActiveIndex(prev => Math.min(prev + 1, steps.length - 1));
      }, activeStep.durationMs);
      return () => clearTimeout(timer);
    }
  }, [activeStep, completeStep, setCurrentStep, steps.length]);

  const persistPreferences = useCallback(async () => {
    setIsSaving(true);
    try {
      await onboardingMutation.mutateAsync(personalizationPayload);
    } finally {
      setIsSaving(false);
    }
  }, [onboardingMutation, personalizationPayload]);

  const handleNext = () => {
    if (!activeStep) {
      return;
    }

    completeStep(activeStep.id);

    if (activeIndex < steps.length - 1) {
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

    const nextFeedback = {
      title: step.content.onAllow?.feedbackTitle,
      body: step.content.onAllow?.feedbackBody,
    };
    setFeedback(nextFeedback);
    handleNext();
  };

  const handlePermissionSecondary = (step: OnboardingPermissionStepType) => {
    if (step.permissionKey === 'location') {
      setLocationPermission(false);
    }

    if (step.permissionKey === 'notifications') {
      setNotificationPermission(false);
    }

    const nextFeedback = {
      title: step.content.onDeny?.feedbackTitle,
      body: step.content.onDeny?.feedbackBody,
    };
    setFeedback(nextFeedback);
    handleNext();
  };

  const handleFinish = async () => {
    await persistPreferences();
    router.replace('/(tabs)');
  };

  const renderStep = () => {
    if (!activeStep) {
      return null;
    }

    if (activeStep.type === 'splash') {
      return (
        <OnboardingSplashStep
          headline={replaceAppName(activeStep.content.headline, appName)}
          subheadline={activeStep.content.subheadline}
          badge={activeStep.content.optionalBadge}
        />
      );
    }

    if (activeStep.type === 'welcome') {
      const step = activeStep as OnboardingWelcomeStepType;
      const lottieSource =
        onboardingLotties[step.ui.lottie.asset as keyof typeof onboardingLotties];
      return (
        <OnboardingWelcomeStep
          headline={step.content.headline}
          body={step.content.body}
          footnote={step.content.footnote}
          lottieSource={lottieSource as unknown as string}
        />
      );
    }

    if (activeStep.type === 'single_choice' || activeStep.type === 'multi_choice') {
      const step = activeStep as OnboardingChoiceStepType;
      const selectedValues =
        step.id === 'prayer_knowledge'
          ? (prayerKnowledge ?? '')
          : step.id === 'support_needed'
            ? (supportNeeded ?? '')
            : step.id === 'learn_islam'
              ? (learnIslam ?? '')
              : step.id === 'why_here'
                ? whyHere
                : step.id === 'attribution'
                  ? (whereDidYouHearAboutUs ?? '')
                  : '';

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
          footerNote={step.content.footerNote}
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
      const step = activeStep as OnboardingPermissionStepType;
      const illustration =
        onboardingIllustrations[step.ui.illustration as keyof typeof onboardingIllustrations];
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
      const lottieSource =
        onboardingLotties[activeStep.ui.lottie.asset as keyof typeof onboardingLotties];
      return (
        <OnboardingFinalStep
          headline={activeStep.content.headline}
          body={activeStep.content.body}
          socialProof={activeStep.content.socialProof?.text}
          lottieSource={lottieSource as unknown as string}
        />
      );
    }

    return null;
  };

  const getPrimaryCtaLabel = () => {
    if (!activeStep) {
      return sharedText.primaryCta;
    }

    if (activeStep.type === 'welcome') {
      return activeStep.content.primaryCta ?? sharedText.getStartedCta;
    }

    if (activeStep.type === 'permission') {
      return activeStep.content.primaryCta;
    }

    if (activeStep.type === 'final') {
      return activeStep.content.primaryCta;
    }

    return sharedText.primaryCta;
  };

  const getSecondaryCtaLabel = () => {
    if (!activeStep) {
      return undefined;
    }

    if (activeStep.type === 'permission') {
      return activeStep.content.secondaryCta;
    }

    if (activeStep.type === 'final') {
      return activeStep.content.secondaryCta;
    }

    return undefined;
  };

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

  const shouldShowFooter = activeStep && activeStep.type !== 'splash';
  const shouldShowHeader = activeStep && activeStep.type !== 'splash';

  const onPrimaryPress = async () => {
    if (!activeStep) {
      return;
    }

    if (activeStep.type === 'permission') {
      await handlePermissionPrimary(activeStep as OnboardingPermissionStepType);
      return;
    }

    if (activeStep.type === 'final') {
      // await handleFinish();
      router.replace('/(tabs)');
      return;
    }

    handleNext();
  };

  const onSecondaryPress = async () => {
    if (!activeStep) {
      return;
    }

    if (activeStep.type === 'permission') {
      handlePermissionSecondary(activeStep as OnboardingPermissionStepType);
      return;
    }

    if (activeStep.type === 'welcome') {
      router.replace('/(screens)/profile/settings');
    }
  };

  const friendsModal = onboardingData.modals.find(modal => modal.id === 'friends_motivation_modal');

  return (
    <OnboardingShell
      stepIndex={activeIndex}
      totalSteps={steps.length}
      onBack={activeIndex > 0 ? handleBack : undefined}
      hideHeader={!shouldShowHeader}
      hideProgress={!shouldShowHeader}
      contentClassName={activeStep?.type === 'splash' ? 'px-0 pb-0' : undefined}
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
          primaryLabel={getPrimaryCtaLabel()}
          onPrimary={onPrimaryPress}
          secondaryLabel={getSecondaryCtaLabel()}
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
    </OnboardingShell>
  );
};

export default Onboarding;
