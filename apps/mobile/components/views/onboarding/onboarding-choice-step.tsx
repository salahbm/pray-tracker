import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { SelectGroup } from '@/components/ui/select-group';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';

import { OnboardingFeedbackCard } from './onboarding-feedback-card';

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
  optionalInput?: {
    label: string;
    placeholder?: string;
    maxLength?: number;
    value: string;
    onChange: (value: string) => void;
  };
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
  optionalInput,
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
    <ScrollView className="flex-1" contentContainerClassName="pb-6">
      <View className="mt-6">
        <Text className="text-3xl font-semibold text-foreground mb-3">{headline}</Text>
        <Text className="text-base text-muted-foreground leading-relaxed">{body}</Text>
      </View>
      <View className="mt-6">
        <SelectGroup
          options={selectOptions}
          value={selected}
          onChange={onChange}
          multiple={multiple}
          variant="outline"
        />
      </View>
      <OnboardingFeedbackCard title={feedbackTitle} body={feedbackBody} />
      {optionalInput && (
        <View className="mt-5">
          <Input
            label={optionalInput.label}
            placeholder={optionalInput.placeholder}
            maxLength={optionalInput.maxLength}
            value={optionalInput.value}
            onChangeText={optionalInput.onChange}
          />
        </View>
      )}
      {footerNote && (
        <Text className="mt-6 text-sm text-muted-foreground text-center">{footerNote}</Text>
      )}
    </ScrollView>
  );
};
