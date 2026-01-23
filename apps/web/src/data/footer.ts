import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Helping Muslims stay consistent with prayer through thoughtful reminders and tracking.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Pricing",
            url: "#pricing"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        }
    ],
    email: 'support@noorpray.app',
    telephone: '+1 (800) 555-0123',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
}
