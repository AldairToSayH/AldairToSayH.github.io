import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8">
      <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-violet/10 blur-3xl" aria-hidden="true" />
      <div ref={revealRef} className="relative mx-auto grid max-w-7xl items-center gap-12 transition-all duration-700 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-72 w-72 rounded-2xl bg-gradient-to-br from-violet to-teal p-[2px] shadow-glow-v sm:h-96 sm:w-96">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-card/70 backdrop-blur">
              <span className="font-mono text-7xl font-bold tracking-tight text-white sm:text-8xl">AZ</span>
            </div>
            <div className="absolute -bottom-5 -right-5 rounded-2xl border border-border-dim bg-void/90 px-5 py-4 shadow-glow-t backdrop-blur">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal">Cusco, Peru</p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-teal">// sobre mi</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Quien Soy</h2>
          <p className="mt-7 text-lg leading-8 text-text-muted">
            Soy Juan Aldair Zavala, estudiante de Ingenieria de Sistemas e Informatica en la Universidad Continental, actualmente en octavo semestre. Vivo en Cusco, Peru, y desarrollo soluciones donde convergen la ciberseguridad, el software, los datos y la infraestructura TI. Me enfoco en crear sistemas confiables, proteger entornos digitales y transformar ideas tecnicas en resultados claros para personas y organizaciones.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Universidad Continental', '8vo Semestre', 'Cusco, Peru'].map((item) => (
              <span key={item} className="rounded-full border border-border-dim bg-card px-4 py-2 font-mono text-sm text-teal">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
