import React, { useEffect, useRef, useState } from 'react';

const categories = [
  { icon: '🔐', name: 'Ciberseguridad', skills: ['Pentesting Web', 'Hacking Etico', 'Kali Linux'] },
  { icon: '💻', name: 'Programacion', skills: ['Python', 'Node.js', 'React', 'C++'] },
  { icon: '🗄️', name: 'Bases de Datos', skills: ['MySQL', 'SQL Server'] },
  { icon: '🌐', name: 'Redes y TI', skills: ['Cisco', 'Gestion de Redes', 'Infraestructura TI'] },
  { icon: '🛠️', name: 'Herramientas', skills: ['Git', 'GitHub', 'Linux', 'Microsoft Office'] },
];

const Skills: React.FC = () => {
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
    <section id="skills" ref={sectionRef} className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-teal">// habilidades</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Stack Tecnico</h2>
          <p className="mt-5 text-lg leading-8 text-text-muted">Un conjunto practico de capacidades para analizar riesgos, construir soluciones y sostener infraestructura digital.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article
              key={category.name}
              style={{ transitionDelay: `${index * 90}ms` }}
              className={`rounded-2xl border border-border-dim border-l-violet bg-card p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-glow-v ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="text-4xl" aria-hidden="true">{category.icon}</div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{category.name}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="rounded border border-teal/30 bg-teal/5 px-2 py-1 font-mono text-xs text-teal">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
