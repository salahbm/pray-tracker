import { ColorProps } from './heat';

const defaultColorMap: ColorProps = {
  theme: '#42b883',
  opacity: [
    { opacity: 0.2, limit: 1 },
    { opacity: 0.4, limit: 2 },
    { opacity: 0.6, limit: 3 },
    { opacity: 0.8, limit: 4 },
    { opacity: 1, limit: 5 },
  ],
};

export { defaultColorMap };
