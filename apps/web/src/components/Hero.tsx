import React from 'react';
import Image from 'next/image';

import AppStoreButton from './AppStoreButton';
import PlayStoreButton from './PlayStoreButton';
import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 pb-0 pt-20 md:pt-40"
    >
      <div className="absolute inset-0 -z-10 w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)] backdrop-blur-[2px]" />

      <div className="text-center mt-10">
        <h1 className="mx-auto max-w-lg text-4xl font-bold text-foreground md:max-w-2xl md:text-6xl md:leading-tight">
          {heroDetails.heading}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-foreground">{heroDetails.subheading}</p>
        <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <AppStoreButton dark />
          <PlayStoreButton dark />
        </div>

        <Image
          src={heroDetails.centerImageSrc}
          width={384}
          height={340}
          quality={100}
          sizes="(max-width: 768px) 100vw, 384px"
          priority
          unoptimized
          alt="app mockup"
          className="relative z-10 mx-auto mt-12"
        />
      </div>
    </section>
  );
};

export default Hero;
