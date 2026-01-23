import { ITestimonial } from '@/types';
import { siteDetails } from './siteDetails';

export const testimonials: ITestimonial[] = [
  {
    name: 'Amina Hassan',
    role: 'Community Organizer',
    message: `${siteDetails.siteName} keeps our team aligned with prayer times during events. The reminders are gentle and reliable.`,
    avatar: '/images/testimonial-1.png',
  },
  {
    name: 'Yusuf Rahman',
    role: 'University Student',
    message: `Noor makes it easy to stay consistent. The streaks and weekly insights keep me motivated even during busy semesters.`,
    avatar: '/images/testimonial-2.png',
  },
  {
    name: 'Fatima Noor',
    role: 'Working Professional',
    message: `I love the Qibla compass and travel updates. Noor always has the right time, wherever I am.`,
    avatar: '/images/testimonial-3.png',
  },
];
