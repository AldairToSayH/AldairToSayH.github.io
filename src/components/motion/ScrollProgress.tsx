import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 32, restDelta: 0.001 });

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-violet via-teal to-teal"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
