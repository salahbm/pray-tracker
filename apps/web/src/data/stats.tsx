import { BsBarChartFill, BsFillStarFill } from 'react-icons/bs';
import { PiGlobeFill } from 'react-icons/pi';

import { IStats } from '@/types';

export const stats: IStats[] = [
  {
    title: '1M+',
    icon: <BsBarChartFill size={34} className="text-blue-500" />,
    description:
      'Daily prayers tracked, helping Muslims maintain their prayer consistency.',
  },
  {
    title: '4.8',
    icon: <BsFillStarFill size={34} className="text-yellow-500" />,
    description: 'Average rating from our dedicated users across app stores.',
  },
  {
    title: '150+',
    icon: <PiGlobeFill size={34} className="text-green-600" />,
    description:
      'Countries supported with accurate prayer times and Qibla direction.',
  },
];
