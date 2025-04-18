'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

export function AnimatedContainer({
  variants,
  initial = 'hidden',
  animate = 'visible',
  ...props
}: HTMLMotionProps<'div'> & { variants?: Variants }) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      variants={variants}
      {...props}
    />
  );
}
