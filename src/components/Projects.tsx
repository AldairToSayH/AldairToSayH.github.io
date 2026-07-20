import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

const projects = [
  {
    title: 'APU Luxury',
    type: 'Marketplace · Proyecto principal',
    description: 'Marketplace e-commerce multi-tenant para vendedores, artesanos, emprendedores y compradores.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    website: 'https://apuluxury.com',
    github: 'https://github.com/AldairToSayH/apu-luxury-last',
    status: 'En línea',
    visual: 'commerce' as const,
    featured: true,
  },
  {
    title: 'Sitio Portafolio',
    type: 'Experiencia web · Personal',
    description: 'Portafolio personal creado con Astro, React y Tailwind CSS. Totalmente estático y desplegado en GitHub Pages.',
    tags: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
    website: '',
    github: 'https://github.com/AldairToSayH/aldairtosayh.github.io',
    status: 'En línea',
    visual: 'portfolio' as const,
    featured: false,
  },
  {
    title: 'Próximo proyecto',
    type: 'Investigación aplicada',
    description: 'Un nuevo proyecto está en desarrollo. Próximamente habrá novedades.',
    tags: ['Python', 'Machine Learning'],
    website: '',
    github: '',
    status: 'En desarrollo',
    visual: 'machine' as const,
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading index="06" eyebrow="proyectos" title="Sistemas pensados para funcionar en el mundo real." description="Una selección de productos y experimentos donde la arquitectura técnica acompaña una necesidad concreta." />
        <StaggerGroup className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.title} className={project.featured ? 'lg:col-span-2' : ''}>
              <TiltCard className={`h-full rounded-3xl border border-border-dim bg-card ${project.featured ? 'lg:grid lg:grid-cols-[1.15fr_.85fr]' : ''}`}>
                <ProjectVisual type={project.visual} featured={project.featured} />
                <div className="relative z-20 flex h-full flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet">{project.type}</p>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] ${project.status === 'En línea' ? 'border-teal/20 bg-teal/[0.06] text-teal' : 'border-violet/20 bg-violet/[0.06] text-violet'}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{project.status}</span>
                  </div>
                  <h3 className={`mt-6 font-display font-bold tracking-[-0.035em] text-white ${project.featured ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{project.title}</h3>
                  <p className="mt-4 leading-7 text-text-muted">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="rounded-md border border-white/[0.07] bg-void/50 px-2.5 py-1.5 font-mono text-[10px] text-text-muted">{tag}</span>)}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-teal px-5 py-2.5 font-display text-sm font-bold text-void transition hover:-translate-y-0.5 hover:bg-[#2be0bd]">Visitar sitio ↗</a>}
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 py-2.5 font-display text-sm font-bold text-text-prime transition hover:-translate-y-0.5 hover:border-violet/60 hover:text-violet">Repositorio ↗</a>}
                    {!project.github && <span className="inline-flex min-h-11 items-center rounded-full border border-border-dim px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Próximamente</span>}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ProjectVisual({ type, featured }: { type: 'commerce' | 'portfolio' | 'machine'; featured: boolean }) {
  return (
    <div className={`relative z-20 overflow-hidden border-b border-border-dim bg-void/65 ${featured ? 'min-h-72 lg:min-h-[31rem] lg:border-b-0 lg:border-r' : 'h-64'}`} role={type === 'commerce' ? undefined : 'img'} aria-label={type === 'commerce' ? undefined : `Portada abstracta del proyecto ${type}`}>
      <div className="technical-grid absolute inset-0 opacity-60" />
      {type === 'commerce' && (
        <div className="absolute inset-5 flex items-center justify-center sm:inset-8 lg:inset-10">
          <picture className="relative block aspect-[1904/950] w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#080706] shadow-[0_24px_80px_rgba(0,0,0,.55)]">
            <source srcSet="/image/home-apu.webp" type="image/webp" />
            <img
              src="/image/home-apu.png"
              alt="Página de inicio del marketplace APU Luxury"
              width="1904"
              height="950"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-700 ease-out motion-safe:group-hover:scale-[1.012]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.025]" aria-hidden="true" />
          </picture>
        </div>
      )}
      {type === 'portfolio' && <div className="absolute inset-8 flex items-center justify-center"><div className="w-full rounded-xl border border-violet/20 bg-[#0c0c12] p-5 font-mono text-[10px] leading-6 text-text-muted"><p className="text-teal">aldair@systems:~$</p><p className="mt-2"><span className="text-violet">const</span> profile = {'{'}</p><p className="pl-4">software: <span className="text-teal">true</span>,</p><p className="pl-4">security: <span className="text-teal">true</span>,</p><p className="pl-4">infrastructure: <span className="text-teal">true</span></p><p>{'}'}</p><span className="mt-3 block h-3 w-px animate-pulse bg-teal motion-reduce:animate-none" /></div></div>}
      {type === 'machine' && <div className="absolute inset-0 flex items-center justify-center"><div className="relative h-40 w-52">{[[50,15],[20,55],[80,58],[38,88],[67,90]].map(([x,y],index)=><span key={index} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/60 bg-void shadow-[0_0_15px_rgba(108,99,255,.25)]" style={{left:`${x}%`,top:`${y}%`}}/>)}<svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100"><path d="M50 15 20 55m30-40 30 43M20 55l18 33m42-30L67 90M20 55l47 35m13-32L38 88" fill="none" stroke="#6C63FF" strokeOpacity=".25"/></svg></div></div>}
    </div>
  );
}
