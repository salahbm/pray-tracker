import { BsBarChartFill, BsFillStarFill } from 'react-icons/bs';
import { PiGlobeFill } from 'react-icons/pi';

import { IStats } from '@/types';

export const stats: IStats[] = [
  {
    title: '3M+',
    icon: <BsBarChartFill size={34} className="text-blue-500" />,
    description: 'Prayers logged by the Noor community each month.',
  },
  {
    title: '4.9',
    icon: <BsFillStarFill size={34} className="text-yellow-500" />,
    description: 'Star rating across app stores for Noor Pray Tracker.',
  },
  {
    title: '190+ ',
    icon: <PiGlobeFill size={34} className="text-green-600" />,
    description: 'Countries supported with localized prayer times.',
  },
];
