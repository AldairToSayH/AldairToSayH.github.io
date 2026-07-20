import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { CSSProperties, MouseEvent, PropsWithChildren } from 'react';

type TiltCardProps = PropsWithChildren<{
  className?: string;
}>;

type GlowStyle = CSSProperties & { '--glow-x': string; '--glow-y': string };

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 240, damping: 25 });
  const rotateY = useSpring(rawY, { stiffness: 240, damping: 25 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rawX.set((0.5 - y) * 8);
    rawY.set((x - 0.5) * 8);
    event.currentTarget.style.setProperty('--glow-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--glow-y', `${y * 100}%`);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className={`group relative transform-gpu overflow-hidden ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900, '--glow-x': '50%', '--glow-y': '50%' } as GlowStyle}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(320px circle at var(--glow-x) var(--glow-y), rgba(108,99,255,.13), transparent 58%)' }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
