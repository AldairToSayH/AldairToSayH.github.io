import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { requestContactAudio } from '../contactAudio';

const roles = [
  'Ingeniería de Sistemas e Informática',
  'Desarrollo de software',
  'Ciberseguridad',
  'Redes e infraestructura TI',
  'Soluciones digitales con propósito',
];

export default function HeroContent() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const role = roles[roleIndex];
    let delay = deleting ? 34 : 58;

    if (!deleting && visibleChars === role.length) delay = 1550;
    if (deleting && visibleChars === 0) delay = 240;

    const timer = window.setTimeout(() => {
      if (!deleting && visibleChars < role.length) {
        setVisibleChars((value) => value + 1);
      } else if (!deleting) {
        setDeleting(true);
      } else if (visibleChars > 0) {
        setVisibleChars((value) => value - 1);
      } else {
        setDeleting(false);
        setRoleIndex((value) => (value + 1) % roles.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, reduceMotion, roleIndex, visibleChars]);

  const scrollTo = (selector: string) => {
    if (selector === '#contact') requestContactAudio();
    document.querySelector(selector)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <motion.div
      className="pointer-events-auto relative z-10 min-w-0 max-w-3xl"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet sm:text-sm">Systems · Software · Security</p>
      <h1 className="mt-5 text-balance font-display text-[clamp(3.4rem,9vw,6.9rem)] font-bold leading-[0.9] tracking-[-0.065em] text-white">
        Aldair <span className="text-text-muted">Zavala</span>
      </h1>
      <div className="mt-6 flex min-h-[4.5rem] items-start sm:min-h-[2.5rem]">
        <p className="font-mono text-lg font-medium leading-8 text-teal sm:text-xl" aria-live="polite">
          {reduceMotion ? roles[0] : roles[roleIndex].slice(0, visibleChars)}
          <span className="ml-1 inline-block h-5 w-px translate-y-1 bg-teal motion-safe:animate-pulse" aria-hidden="true" />
        </p>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
        Diseño y construyo soluciones confiables donde convergen el software, la seguridad, los datos y la infraestructura tecnológica.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => scrollTo('#projects')} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-violet px-7 py-3.5 font-display text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#7971ff] hover:shadow-glow-v">
          Explorar proyectos
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </button>
        <button type="button" onClick={() => scrollTo('#contact')} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.025] px-7 py-3.5 font-display text-sm font-bold text-text-prime transition hover:-translate-y-0.5 hover:border-teal/60 hover:text-teal">
          Contáctame
        </button>
      </div>
      <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted sm:text-xs">
        <span className="h-px w-10 bg-gradient-to-r from-violet to-teal" /> Cusco, Perú · UTC−5
      </div>
    </motion.div>
  );
}
