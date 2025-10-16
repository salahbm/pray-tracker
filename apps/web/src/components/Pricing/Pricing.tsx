import PricingColumn from './PricingColumn';

import { tiers } from '@/data/pricing';

const Pricing: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center">
      {tiers.map((tier, index) => (
        <PricingColumn key={tier.name} tier={tier} highlight={index === 1} />
      ))}
    </div>
  );
};

export default Pricing;
