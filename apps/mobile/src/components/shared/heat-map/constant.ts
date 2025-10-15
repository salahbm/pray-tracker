import { ColorProps } from './heat';

const MAX_DISPLAY_POINTS = 10; // Max score treated as full
const MAX_POSSIBLE_POINTS = 12; // Absolute max possible points

const defaultColorMap: ColorProps = {
  theme: '#a7ff07',
  opacity: [
    { opacity: 0, limit: 0 },
    { opacity: 0.1, limit: 1 },
    { opacity: 0.2, limit: 2 },
    { opacity: 0.4, limit: 4 },
    { opacity: 0.6, limit: 6 },
    { opacity: 0.8, limit: 8 },
    { opacity: 1, limit: MAX_DISPLAY_POINTS },
  ],
};

export { defaultColorMap, MAX_DISPLAY_POINTS, MAX_POSSIBLE_POINTS };
