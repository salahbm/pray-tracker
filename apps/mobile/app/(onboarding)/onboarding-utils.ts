import type {
  OnboardingChoiceStep,
  OnboardingOption,
  OnboardingPermissionStep,
  OnboardingStep,
  OnboardingSharedText,
} from './onboarding-types';

export const replaceAppName = (value: string, appName: string) =>
  value.replace(/\{\{APP_NAME\}\}/g, appName);

export const resolveOptionFeedback = (option?: OnboardingOption) => {
  if (!option?.onSelect) {
    return { title: undefined, body: undefined };
  }

  return {
    title: option.onSelect.feedbackTitle,
    body: option.onSelect.feedbackBody ?? option.onSelect.feedback,
  };
};

export const getSplashStep = (steps: OnboardingStep[]) =>
  steps.find(step => step.type === 'splash');

export const getMainSteps = (steps: OnboardingStep[]) =>
  steps.filter(step => step.type !== 'splash');

export const getInitialStepIndex = (steps: OnboardingStep[], currentStepId: string) => {
  const index = steps.findIndex(step => step.id === currentStepId);
  return index >= 0 ? index : 0;
};

export const getPrimaryCtaLabel = (
  step: OnboardingStep | undefined,
  sharedText: OnboardingSharedText
) => {
  if (!step) {
    return sharedText.primaryCta;
  }

  if (step.type === 'welcome') {
    return step.content.primaryCta ?? sharedText.getStartedCta;
  }

  if (step.type === 'permission') {
    return step.content.primaryCta;
  }

  if (step.type === 'final') {
    return step.content.primaryCta;
  }

  return sharedText.primaryCta;
};

export const getSecondaryCtaLabel = (step: OnboardingStep | undefined) => {
  if (!step) {
    return undefined;
  }

  if (step.type === 'permission') {
    return step.content.secondaryCta;
  }

  if (step.type === 'final') {
    return step.content.secondaryCta;
  }

  return undefined;
};

export const getPermissionFeedback = (
  step: OnboardingPermissionStep,
  variant: 'allow' | 'deny'
) => {
  if (variant === 'allow') {
    return {
      title: step.content.onAllow?.feedbackTitle,
      body: step.content.onAllow?.feedbackBody,
    };
  }

  return {
    title: step.content.onDeny?.feedbackTitle,
    body: step.content.onDeny?.feedbackBody,
  };
};

export const getChoiceSelectedValues = (
  step: OnboardingChoiceStep,
  selections: {
    prayerKnowledge?: string | null;
    supportNeeded?: string | null;
    learnIslam?: string | null;
    whyHere: string[];
    whereDidYouHearAboutUs?: string | null;
  }
) => {
  if (step.id === 'prayer_knowledge') {
    return selections.prayerKnowledge ?? '';
  }

  if (step.id === 'support_needed') {
    return selections.supportNeeded ?? '';
  }

  if (step.id === 'learn_islam') {
    return selections.learnIslam ?? '';
  }

  if (step.id === 'why_here') {
    return selections.whyHere;
  }

  if (step.id === 'attribution') {
    return selections.whereDidYouHearAboutUs ?? '';
  }

  return '';
};
