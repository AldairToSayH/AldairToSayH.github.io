import React, { useEffect, useRef, useState } from 'react';

const Experience: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.22 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-teal">// experiencia</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Trayectoria Profesional</h2>
        </div>

        <div className="relative mt-14 pl-8 sm:pl-12">
          <div className="absolute left-2 top-0 h-full w-px bg-violet shadow-glow-v sm:left-4" aria-hidden="true" />

          <div className="grid gap-8">
            <div className="relative">
              <div className="absolute -left-8 top-8 h-4 w-4 rounded-full border-4 border-void bg-teal shadow-glow-t sm:-left-10" aria-hidden="true" />
              <article
                ref={cardRef}
                className={`rounded-2xl border border-teal/40 bg-card p-6 shadow-[0_0_28px_rgba(0,212,170,0.14)] transition-all duration-700 sm:p-8 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-teal/15 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-teal">MAY 2026 — ACTUALIDAD</span>
                  <span className="font-mono text-sm text-text-muted">Cusco, Perú · Presencial</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-white">Cámara de Comercio del Cusco</h3>
                <p className="mt-2 text-lg font-semibold text-teal">Responsable de Producción y Logística</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-teal">ACTUAL</span>
                  <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-xs text-violet">Presencial</span>
                  <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-xs text-violet">Prácticas laborales</span>
                </div>
                <ul className="mt-6 space-y-4 text-text-muted">
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Dinamización del Ecosistema Regional de Innovación y Emprendimiento <a href="https://innovasuyu.proinnovate.gob.pe/region-cusco/" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet">DER Cusco 3.0</a>  </li>
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Capacitar a los gremios empresariales en la adopción de tecnologías aplicadas al turismo y la agroindustria.</li>
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Coordinar mesas de trabajo entre la academia, el sector privado y las entidades estatales.</li>
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Promover el escalamiento de los emprendimientos regionales hacia mercados nacionales e internacionales.</li>
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Administrar y canalizar fondos concursables dirigidos a la transformación digital y economía circular.</li>
                </ul>
              </article>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 h-4 w-4 rounded-full border-4 border-void bg-violet shadow-glow-v sm:-left-10" aria-hidden="true" />
              <article
                className={`rounded-2xl border border-border-dim bg-card p-6 transition-all duration-700 sm:p-8 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                  }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-violet/15 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-violet">Nov 2024 - Ene 2025</span>
                  <span className="font-mono text-sm text-text-muted">Pisac, Cusco</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-white">CONSORCIO HZ Pisac</h3>
                <p className="mt-2 text-lg font-semibold text-teal">Responsable de Base de Datos y Soporte TI</p>
                <ul className="mt-6 space-y-4 text-text-muted">
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Optimice la gestion de datos del consorcio con SQL Server, asegurando disponibilidad continua y respaldo de informacion critica.</li>
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Fortaleci la infraestructura TI y la administracion de red interna para mantener la continuidad operativa diaria.</li>
                  <li className="flex gap-3 leading-7"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal" />Agilice la logistica de almacen mediante la integracion de nuevas herramientas digitales, mejorando el control operacional.</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
