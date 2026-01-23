import { IFAQ } from '@/types';
import { siteDetails } from './siteDetails';

export const faqs: IFAQ[] = [
  {
    question: `How accurate are ${siteDetails.siteName} prayer times?`,
    answer:
      'Noor uses trusted calculation methods and updates automatically based on your location, madhab, and preferred settings.',
  },
  {
    question: `Can I use ${siteDetails.siteName} on multiple devices?`,
    answer:
      'Yes. Your prayer logs and preferences sync across your phone, tablet, and web dashboard.',
  },
  {
    question: 'Does Noor work when I travel?',
    answer:
      'Absolutely. Noor updates prayer times automatically and keeps your reminders aligned with your new location.',
  },
  {
    question: 'Can I customize adhan and reminders?',
    answer: 'Yes. Choose reminder styles, sounds, and timing so Noor fits your routine.',
  },
  {
    question: 'What if I need help using the app?',
    answer:
      'Our support team is ready via chat or email, and the in-app guide walks you through every feature.',
  },
];
