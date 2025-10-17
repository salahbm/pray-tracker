import Benefits from '@/components/Benefits/Benefits';
import Container from '@/components/Container';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing/Pricing';
import Section from '@/components/Section';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section id="testimonials" title="What Our Users Say" description="Hear from our users.">
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
