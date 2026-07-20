import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { MouseEvent } from 'react';

const nodes = [
  { label: 'Software', x: 50, y: 9, color: '#6C63FF' },
  { label: 'Seguridad', x: 87, y: 50, color: '#00D4AA' },
  { label: 'Datos', x: 50, y: 91, color: '#6C63FF' },
  { label: 'Redes', x: 13, y: 50, color: '#00D4AA' },
];

export default function SystemsCore() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[27rem]" onMouseMove={handleMove} onMouseLeave={reset}>
      <div className="absolute inset-[8%] rounded-full bg-violet/5 blur-3xl" aria-hidden="true" />
      <motion.div className="relative h-full w-full" style={{ x, y }}>
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" role="img" aria-label="Systems Core: software, seguridad, datos y redes conectados">
          <defs>
            <linearGradient id="core-line" x1="0" x2="1">
              <stop stopColor="#6C63FF" stopOpacity=".55" />
              <stop offset="1" stopColor="#00D4AA" stopOpacity=".55" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="39" fill="none" stroke="#6C63FF" strokeOpacity=".13" strokeWidth=".35" strokeDasharray="2 3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#00D4AA" strokeOpacity=".16" strokeWidth=".4" />
          <motion.ellipse
            cx="50" cy="50" rx="42" ry="19" fill="none" stroke="url(#core-line)" strokeWidth=".45" strokeDasharray="4 3"
            animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '50px 50px' }}
          />
          <motion.ellipse
            cx="50" cy="50" rx="19" ry="42" fill="none" stroke="url(#core-line)" strokeWidth=".45" strokeDasharray="2 4"
            animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '50px 50px' }}
          />
          {nodes.map((node) => (
            <g key={node.label}>
              <line x1="50" y1="50" x2={node.x} y2={node.y} stroke="url(#core-line)" strokeWidth=".35" strokeOpacity=".55" />
              <motion.circle cx={node.x} cy={node.y} r="2.1" fill="#0A0A0F" stroke={node.color} strokeWidth=".65" animate={reduceMotion ? undefined : { r: [1.8, 2.3, 1.8] }} transition={{ duration: 2.8, repeat: Infinity, delay: node.x / 80 }} />
            </g>
          ))}
          <circle cx="50" cy="50" r="15" fill="#12121A" stroke="url(#core-line)" strokeWidth=".7" />
          <circle cx="50" cy="50" r="11" fill="#0A0A0F" stroke="#6C63FF" strokeOpacity=".35" strokeWidth=".45" />
          <text x="50" y="51.5" textAnchor="middle" fill="#F0F0F0" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="8">AZ</text>
          <text x="50" y="57" textAnchor="middle" fill="#8A8A9A" fontFamily="JetBrains Mono, monospace" fontSize="2.3" letterSpacing=".7">SYSTEMS CORE</text>
        </svg>
        {nodes.map((node) => (
          <span
            key={node.label}
            className="absolute -translate-x-1/2 rounded-full border border-white/10 bg-void/90 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted sm:text-[10px]"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%) translateY(18px)' }}
          >
            {node.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
