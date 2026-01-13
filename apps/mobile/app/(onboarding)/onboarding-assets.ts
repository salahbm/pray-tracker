import confetti from '@assets/gif/confetti.json';
import { gifs, IMAGES } from '@/constants/images';

export const onboardingLotties = {
  welcome_lottie: gifs.share_with_friends,
  success_confetti_soft: confetti,
} as const;

export const onboardingIllustrations = {
  location_qibla_times: IMAGES.compass,
  adhan_reminders: IMAGES.check,
} as const;
