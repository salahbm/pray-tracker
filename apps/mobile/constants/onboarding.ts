import man_looking_through from '@assets/gif/man_looking_through.json';
import man_praying from '@assets/gif/man_praying.json';
import moon_candles from '@assets/gif/moon_candles.json';
import share_with_friends from '@assets/gif/share_with_friends.json';
import clock_sand from '@assets/gif/clock_sand.json';
import man_premium from '@assets/gif/man_premium.json';
import chart from '@assets/gif/chart.json';
import friends_group from '@assets/gif/friends_group.json';
import friendships from '@assets/gif/friendships.json';
import share from '@assets/gif/share.json';
import woman_reading_koran from '@assets/gif/woman_reading_koran.json';
import learning from '@assets/gif/learning.json';

export const gifs = {
  man_looking_through,
  man_praying,
  moon_candles,
  share_with_friends,
  clock_sand,
  man_premium,
  chart,
  friends_group,
  friendships,
  share,
  woman_reading_koran,
  learning,
};

export const onboarding = [
  {
    id: 1,
    titleKey: 'auth.welcome.onboarding.track.title',
    descriptionKey: 'auth.welcome.onboarding.track.description',
    gif: gifs.man_praying,
  },
  {
    id: 2,
    titleKey: 'auth.welcome.onboarding.share.title',
    descriptionKey: 'auth.welcome.onboarding.share.description',
    gif: gifs.share_with_friends,
  },
  {
    id: 3,
    titleKey: 'auth.welcome.onboarding.remind.title',
    descriptionKey: 'auth.welcome.onboarding.remind.description',
    gif: gifs.clock_sand,
  },
  {
    id: 4,
    titleKey: 'auth.welcome.onboarding.journey.title',
    descriptionKey: 'auth.welcome.onboarding.journey.description',
    gif: gifs.moon_candles,
  },
  {
    id: 5,
    titleKey: 'auth.welcome.onboarding.aware.title',
    descriptionKey: 'auth.welcome.onboarding.aware.description',
    gif: gifs.man_looking_through,
  },
];
