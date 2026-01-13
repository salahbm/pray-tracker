import { SelectGroup } from '@/components/ui/select-group';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { NextPage } from 'next';
import { useState } from 'react';
import { View } from 'react-native';

type OnboardingProps = {};

const Onboarding: NextPage<OnboardingProps> = () => {
  const [knowledge, setKnowledge] = useState('');
  const [goals, setGoals] = useState('');
  const [quick, setQuick] = useState('');
  return (
    <View>
      <Text>This is example of select to start the onboarding</Text>
      <SelectGroup
        title="Do you know how to pray?"
        description="Choose what fits you today"
        options={[
          { value: 'yes', label: 'Yes, I know' },
          { value: 'learning', label: "I'm learning" },
          { value: 'no', label: 'Not yet' },
        ]}
        value={knowledge}
        onChange={value => setKnowledge(value as string)}
      />

      <SelectGroup
        title="Select your goal"
        options={[
          {
            value: 'pray',
            label: 'Pray 5 times daily',
            description: 'Build consistency with reminders',
          },
          {
            value: 'learn',
            label: 'Learn how to pray',
            description: 'Step-by-step guidance',
          },
        ]}
        value={goals}
        onChange={value => setGoals(value as string)}
        variant="outline"
      />

      <SelectGroup
        title="Why are you here?"
        options={[
          {
            value: 'pray',
            label: 'Pray 5 times daily',
            icon: <Ionicons name="person" size={24} color="black" />,
          },
          {
            value: 'learn',
            label: 'Learn how to pray',
            icon: <Ionicons name="person" size={24} color="black" />,
          },
        ]}
        value={quick}
        onChange={value => setQuick(value as string)}
        variant="default"
        disableAnimation
      />
    </View>
  );
};

export default Onboarding;
