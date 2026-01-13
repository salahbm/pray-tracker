import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { SelectGroup } from '@/components/ui/select-group';
import { Text } from '@/components/ui/text';

import { OnboardingFeedbackCard } from './onboarding-feedback';

export type OnboardingChoiceOption = {
  id: string;
  label: string;
  description?: string;
  feedbackTitle?: string;
  feedbackBody?: string;
  feedback?: string;
};

interface OnboardingChoiceStepProps {
  headline: string;
  body: string;
  options: OnboardingChoiceOption[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  footerNote?: string;
  feedbackTitle?: string;
  feedbackBody?: string;
}

export const OnboardingChoiceStep = ({
  headline,
  body,
  options,
  selected,
  onChange,
  multiple = false,
  footerNote,
  feedbackTitle,
  feedbackBody,
}: OnboardingChoiceStepProps) => {
  const selectOptions = useMemo(
    () =>
      options.map(option => ({
        value: option.id,
        label: option.label,
        description: option.description,
      })),
    [options]
  );

  return (
    <ScrollView
      className="flex-1 overflow-visible"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-6"
    >
      <View className="my-6">
        <Text className="text-3xl font-semibold text-foreground mb-3">{headline}</Text>
        <Text className="text-base text-muted-foreground leading-relaxed">{body}</Text>
      </View>

      <SelectGroup
        options={selectOptions}
        value={selected}
        onChange={onChange}
        multiple={multiple}
        variant="outline"
      />
      <OnboardingFeedbackCard title={feedbackTitle} body={feedbackBody} />

      {footerNote && (
        <Text className="mt-6 text-sm text-muted-foreground text-center">{footerNote}</Text>
      )}
    </ScrollView>
  );
};
