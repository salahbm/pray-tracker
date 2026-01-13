export type OnboardingToneType = {
  style: string;
  islamic: string;
  notes: string[];
};

export type OnboardingBrandingType = {
  useBismillahOption: boolean;
  bismillahText: string;
  closingDuaOptional: boolean;
};

export type OnboardingMetaType = {
  flowId: string;
  appNamePlaceholder: string;
  branding: OnboardingBrandingType;
};

export type OnboardingSharedTextType = {
  primaryCta: string;
  secondaryCta: string;
  skipCta: string;
  backCta: string;
  getStartedCta: string;
  privacyNote: string;
};

export type OnboardingOptionActionType =
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

export type OnboardingOptionSelectType = {
  feedbackTitle?: string;
  feedbackBody?: string;
  feedback?: string;
  action?: OnboardingOptionActionType;
};

export type OnboardingOptionType = {
  id: string;
  label: string;
  onSelect?: OnboardingOptionSelectType;
};

export type OnboardingStepBaseType = {
  id: string;
  type: string;
  content: {
    headline: string;
    body?: string;
  };
};

export type OnboardingSplashStepType = OnboardingStepBaseType & {
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

export type OnboardingWelcomeStepType = OnboardingStepBaseType & {
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

export type OnboardingChoiceStepType = OnboardingStepBaseType & {
  type: 'single_choice' | 'multi_choice';
  content: {
    headline: string;
    body: string;
    options: OnboardingOptionType[];
    minSelections?: number;
    maxSelections?: number;
    footerNote?: string;
  };
};

export type OnboardingPermissionStepType = OnboardingStepBaseType & {
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

export type OnboardingFinalStepType = OnboardingStepBaseType & {
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

export type OnboardingStepType =
  | OnboardingSplashStepType
  | OnboardingWelcomeStepType
  | OnboardingChoiceStepType
  | OnboardingPermissionStepType
  | OnboardingFinalStepType;

export type OnboardingModalType = {
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

export type OnboardingDataType = {
  schemaVersion: string;
  locale: string;
  tone: OnboardingToneType;
  meta: OnboardingMetaType;
  sharedText: OnboardingSharedTextType;
  steps: OnboardingStepType[];
  modals: OnboardingModalType[];
};
