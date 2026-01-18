import { benefits } from '@/data/benefits';

import BenefitSection from './benefit-section';

const Benefits: React.FC = () => {
  return (
    <div id="features" className="mt-10">
      <h2 className="sr-only">Features</h2>
      {benefits.map((item, index) => {
        return <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />;
      })}
    </div>
  );
};

export default Benefits;
