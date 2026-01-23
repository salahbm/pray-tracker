import {
  FiAward,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiMap,
  FiMapPin,
  FiTrendingUp,
} from 'react-icons/fi';

import { IBenefit } from '@/types';

export const benefits: IBenefit[] = [
  {
    title: 'Accurate Prayer Times',
    description:
      'Get daily prayer schedules tailored to your location, madhab, and calculation preferences.',
    bullets: [
      {
        title: 'Location-Based Updates',
        description: 'Instantly refreshes when you travel or change time zones.',
        icon: <FiMapPin size={26} />,
      },
      {
        title: 'Smart Adhan Reminders',
        description: 'Receive gentle notifications for every salah without distractions.',
        icon: <FiBell size={26} />,
      },
      {
        title: 'Prayer Window Alerts',
        description: 'Know the best time to pray with sunrise and sunset markers.',
        icon: <FiClock size={26} />,
      },
    ],
    imageSrc: '/images/mockup-1.webp',
  },
  {
    title: 'Track Your Worship',
    description:
      'Log every prayer, build consistency, and celebrate your progress over time.',
    bullets: [
      {
        title: 'Prayer Logs',
        description: 'Mark each salah as on time, late, or missed with one tap.',
        icon: <FiCheckCircle size={26} />,
      },
      {
        title: 'Streaks & Badges',
        description: 'Stay motivated with streaks, milestones, and gentle nudges.',
        icon: <FiAward size={26} />,
      },
      {
        title: 'Weekly Insights',
        description: 'Review your consistency and discover patterns that help you improve.',
        icon: <FiTrendingUp size={26} />,
      },
    ],
    imageSrc: '/images/mockup-2.webp',
  },
  {
    title: 'Qibla & Community Tools',
    description:
      'Find the Qibla quickly and connect with nearby masajid and Ramadan tools.',
    bullets: [
      {
        title: 'Qibla Compass',
        description: 'A reliable compass that points you toward Makkah anywhere.',
        icon: <FiCompass size={26} />,
      },
      {
        title: 'Nearby Mosques',
        description: 'Discover local prayer spaces with distance and directions.',
        icon: <FiMap size={26} />,
      },
      {
        title: 'Ramadan Mode',
        description:
          'Track fasting times, suhoor reminders, and nightly prayers with ease.',
        icon: <FiCalendar size={26} />,
      },
    ],
    imageSrc: '/images/mockup-1.webp',
  },
];
