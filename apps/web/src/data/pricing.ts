import { IPricing } from '@/types';

export const tiers: IPricing[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Daily prayer times & reminders',
      'Basic prayer logging',
      'Qibla compass access',
      'Community articles',
    ],
  },
  {
    name: 'Premium Monthly',
    price: 2.99,
    features: [
      'Advanced streak tracking',
      'Custom adhan sounds',
      'Ramadan mode & fasting reminders',
      'Priority support',
      'Cloud sync across devices',
    ],
  },
  {
    name: 'Premium Yearly',
    price: 24.99,
    features: [
      'Everything in Premium Monthly',
      'Yearly savings bundle',
      'Personalized insights',
      'Family profile sharing',
      'Early access to new features',
    ],
  },
];
