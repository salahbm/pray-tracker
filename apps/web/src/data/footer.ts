import { IMenuItem, ISocials } from '@/types';

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading:
    'Helping Muslims stay consistent with prayer through thoughtful reminders and tracking.',
  quickLinks: [
    {
      text: 'Features',
      url: '/#features',
    },
    {
      text: 'Privacy Policy',
      url: '/privacy',
    },
    {
      text: 'Terms of Service',
      url: '/terms',
    },
  ],
  email: 'help@noorapp.uz',
  telephone: '',
  socials: {
    // github: 'https://github.com',
    // x: 'https://twitter.com/x',
    twitter: 'https://twitter.com/noorapp',
    facebook: 'https://facebook.com/noorapp',
    // youtube: 'https://youtube.com',
    linkedin: 'https://www.linkedin.com/company/noorapp',
    // threads: 'https://www.threads.net',
    instagram: 'https://www.instagram.com/noor__app',
  },
};
