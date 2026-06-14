import React, { useEffect, useRef, useState } from 'react';

const certifications = [
  { name: 'Ciberseguridad en Pentesting Web (C|PW)', institution: 'UNI Lima', year: '2025' },
  { name: 'Hacking Etico + IA (C|EH)', institution: 'UNI Lima', year: '2025' },
  { name: 'Machine Learning con Python + IA', institution: 'UNI Lima', year: '2025' },
  { name: 'CCNA: Introduccion a Redes', institution: 'Universidad Continental', year: '2024' },
];

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-teal">// certificaciones</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Credenciales</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {certifications.map((certification, index) => (
            <article
              key={certification.name}
              style={{ transitionDelay: `${index * 110}ms` }}
              className={`group rounded-2xl border border-border-dim bg-card p-6 transition-all duration-700 hover:-translate-y-2 hover:border-violet hover:shadow-glow-v ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{certification.institution}</p>
              <h3 className="mt-5 min-h-24 font-display text-xl font-bold leading-7 text-white">{certification.name}</h3>
              <span className="mt-6 inline-flex rounded-full border border-teal/30 bg-teal/5 px-3 py-1 font-mono text-xs text-teal">{certification.year}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
