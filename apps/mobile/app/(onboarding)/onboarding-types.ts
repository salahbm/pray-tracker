export type OnboardingTone = {
  style: string;
  islamic: string;
  notes: string[];
};

export type OnboardingBranding = {
  useBismillahOption: boolean;
  bismillahText: string;
  closingDuaOptional: boolean;
};

export type OnboardingMeta = {
  flowId: string;
  appNamePlaceholder: string;
  branding: OnboardingBranding;
};

export type OnboardingSharedText = {
  primaryCta: string;
  secondaryCta: string;
  skipCta: string;
  backCta: string;
  getStartedCta: string;
  privacyNote: string;
};

export type OnboardingOptionAction =
  | {
      type: 'open_modal';
      modalId: string;
    }
  | {
      type: 'optional_text_input';
      field: {
        id: string;
        label: string;
        placeholder?: string;
        maxLength?: number;
      };
    };

export type OnboardingOptionSelect = {
  feedbackTitle?: string;
  feedbackBody?: string;
  feedback?: string;
  action?: OnboardingOptionAction;
};

export type OnboardingOption = {
  id: string;
  label: string;
  onSelect?: OnboardingOptionSelect;
};

export type OnboardingStepBase = {
  id: string;
  type: string;
  content: {
    headline: string;
    body?: string;
  };
};

export type OnboardingSplashStep = OnboardingStepBase & {
  type: 'splash';
  durationMs: number;
  ui: {
    background: string;
    logo: string;
  };
  content: {
    headline: string;
    subheadline: string;
    optionalBadge?: string;
  };
};

export type OnboardingWelcomeStep = OnboardingStepBase & {
  type: 'welcome';
  ui: {
    lottie: {
      asset: string;
      loop: boolean;
    };
  };
  content: {
    headline: string;
    body: string;
    footnote?: string;
    primaryCta?: string;
  };
};

export type OnboardingChoiceStep = OnboardingStepBase & {
  type: 'single_choice' | 'multi_choice';
  content: {
    headline: string;
    body: string;
    options: OnboardingOption[];
    minSelections?: number;
    maxSelections?: number;
    footerNote?: string;
  };
};

export type OnboardingPermissionStep = OnboardingStepBase & {
  type: 'permission';
  permissionKey: 'location' | 'notifications';
  ui: {
    illustration: string;
  };
  content: {
    headline: string;
    body: string;
    benefits: string[];
    primaryCta: string;
    secondaryCta: string;
    onAllow?: {
      feedbackTitle?: string;
      feedbackBody?: string;
    };
    onDeny?: {
      feedbackTitle?: string;
      feedbackBody?: string;
    };
  };
};

export type OnboardingFinalStep = OnboardingStepBase & {
  type: 'final';
  ui: {
    lottie: {
      asset: string;
      loop: boolean;
    };
  };
  content: {
    headline: string;
    body: string;
    socialProof?: {
      text: string;
      note?: string;
    };
    primaryCta: string;
    secondaryCta?: string;
  };
};

export type OnboardingStep =
  | OnboardingSplashStep
  | OnboardingWelcomeStep
  | OnboardingChoiceStep
  | OnboardingPermissionStep
  | OnboardingFinalStep;

export type OnboardingModal = {
  id: string;
  type: string;
  content: {
    headline: string;
    body: string;
    bullets?: string[];
    primaryCta?: string;
    secondaryCta?: string;
  };
};

export type OnboardingData = {
  schemaVersion: string;
  locale: string;
  tone: OnboardingTone;
  meta: OnboardingMeta;
  sharedText: OnboardingSharedText;
  steps: OnboardingStep[];
  modals: OnboardingModal[];
};
