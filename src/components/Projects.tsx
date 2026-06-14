import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    title: 'Tarjeta Personal',
    description: 'Tarjeta personal interactiva construida con tecnologias web modernas.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    icon: 'ID',
    github: 'https://github.com/AldairToSayH/Tarjeta-Personal/',
    disabled: false,
  },
  {
    title: 'Sitio Portafolio',
    description: 'Portafolio personal creado con Astro, React y Tailwind CSS. Totalmente estatico y desplegado en GitHub Pages.',
    tags: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
    icon: 'AZ',
    github: 'https://github.com/AldairToSayH/aldairtosayh.github.io',
    disabled: false,
  },
  {
    title: 'Proximo Proyecto',
    description: 'Un nuevo proyecto esta en desarrollo. Pronto habra novedades.',
    tags: ['Python', 'Machine Learning'],
    icon: 'ML',
    github: '',
    disabled: true,
  },
];

const Projects: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="projects" className="px-5 py-24 sm:px-8">
      <div ref={revealRef} className="mx-auto max-w-7xl transition-all duration-700">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-teal">// proyectos</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Trabajo Seleccionado</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-2xl border border-border-dim border-t-transparent bg-card transition-all duration-300 hover:-translate-y-2 hover:border-t-violet hover:shadow-glow-v">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-violet/35 via-card to-teal/25" role="img" aria-label={`Imagen representativa de ${project.title}`}>
                <span className="rounded-2xl border border-white/10 bg-void/50 px-6 py-4 font-mono text-4xl font-bold text-white shadow-glow-v backdrop-blur">{project.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-4 min-h-20 leading-7 text-text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded border border-teal/30 bg-teal/5 px-2 py-1 font-mono text-xs text-teal">{tag}</span>
                  ))}
                </div>
                {project.disabled ? (
                  <button type="button" disabled className="mt-6 w-full rounded-full border border-border-dim px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-text-muted opacity-60">
                    En desarrollo
                  </button>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-violet px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.16em] text-violet transition hover:bg-violet hover:text-white focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
                  >
                    Ver en GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
