import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import Reveal from './motion/Reveal';
import SectionHeading from './ui/SectionHeading';

const experiences = [
  {
    period: 'MAY 2026 — ACTUALIDAD',
    location: 'Cusco, Perú · Presencial',
    company: 'Cámara de Comercio del Cusco',
    role: 'Responsable de Producción y Logística',
    current: true,
    tags: ['Presencial', 'Prácticas laborales'],
    items: [
      <>Dinamización del Ecosistema Regional de Innovación y Emprendimiento <a href="https://innovasuyu.proinnovate.gob.pe/region-cusco/" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet transition hover:text-teal">DER Cusco 3.0</a>.</>,
      <>Capacitación a gremios empresariales en la adopción de tecnologías aplicadas al turismo y la agroindustria.</>,
      <>Coordinación de mesas de trabajo entre la academia, el sector privado y las entidades estatales.</>,
      <>Promoción del escalamiento de emprendimientos regionales hacia mercados nacionales e internacionales.</>,
      <>Administración y canalización de fondos concursables para transformación digital y economía circular.</>,
    ],
  },
  {
    period: 'NOV 2024 — ENE 2025',
    location: 'Pisac, Cusco',
    company: 'CONSORCIO HZ Pisac',
    role: 'Responsable de Base de Datos y Soporte TI',
    current: false,
    tags: ['SQL Server', 'Soporte TI'],
    items: [
      <>Optimicé la gestión de datos con SQL Server, asegurando disponibilidad continua y respaldo de información crítica.</>,
      <>Fortalecí la infraestructura TI y la administración de red interna para mantener la continuidad operativa diaria.</>,
      <>Agilicé la logística de almacén integrando herramientas digitales para mejorar el control operacional.</>,
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 75%', 'end 70%'] });
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 95, damping: 28 });

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading title="Trayectoria aplicada a problemas reales." />
        <div className="relative mt-14 sm:mt-16">
          <div className="absolute bottom-0 left-[7px] top-1 w-px bg-border-dim sm:left-[11.5rem]" aria-hidden="true" />
          <motion.div className="absolute left-[7px] top-1 h-full w-px origin-top bg-gradient-to-b from-teal via-violet to-violet/20 sm:left-[11.5rem]" style={{ scaleY: reduceMotion ? 1 : lineScale }} aria-hidden="true" />
          <div className="grid gap-12 sm:gap-16">
            {experiences.map((experience, index) => (
              <Reveal key={experience.company} delay={index * 0.08} direction="right">
                <div className="relative grid gap-5 pl-8 sm:grid-cols-[9.5rem_1fr] sm:gap-12 sm:pl-0">
                  <div className="sm:text-right">
                    <p className={`font-mono text-[10px] font-semibold uppercase leading-5 tracking-[0.12em] ${experience.current ? 'text-teal' : 'text-violet'}`}>{experience.period}</p>
                    <p className="mt-2 font-mono text-[10px] leading-5 text-text-muted">{experience.location}</p>
                  </div>
                  <span className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-[4px] border-void sm:left-[11.05rem] ${experience.current ? 'bg-teal shadow-[0_0_0_5px_rgba(0,212,170,.1)]' : 'bg-violet shadow-[0_0_0_5px_rgba(108,99,255,.1)]'}`} aria-hidden="true" />
                  <article className="relative rounded-2xl border border-border-dim bg-card/80 p-6 sm:p-8">
                    <div className="absolute right-5 top-5 font-mono text-[9px] tracking-[0.2em] text-text-muted" aria-hidden="true">0{index + 1}</div>
                    <h3 className="pr-10 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{experience.company}</h3>
                    <p className="mt-2 text-base font-semibold text-teal sm:text-lg">{experience.role}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.current && <span className="rounded-full border border-teal/25 bg-teal/[0.07] px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-teal">Actual</span>}
                      {experience.tags.map((tag) => <span key={tag} className="rounded-full border border-white/[0.07] px-3 py-1 font-mono text-[9px] text-text-muted">{tag}</span>)}
                    </div>
                    <ul className="mt-7 grid gap-4 text-sm leading-7 text-text-muted sm:text-base">
                      {experience.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-violet" aria-hidden="true" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
