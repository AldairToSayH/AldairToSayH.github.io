import { motion } from 'motion/react';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import SectionHeading from './ui/SectionHeading';
import TechIcon from './ui/TechIcon';
import TiltCard from './ui/TiltCard';

const categories = [
  { icon: 'security' as const, name: 'Ciberseguridad', code: 'SEC-01', skills: ['Pentesting web', 'Hacking ético', 'Kali Linux'], accent: 'teal' },
  { icon: 'code' as const, name: 'Programación', code: 'DEV-02', skills: ['Python', 'Node.js', 'React', 'C++'], accent: 'violet' },
  { icon: 'database' as const, name: 'Bases de datos', code: 'DAT-03', skills: ['MySQL', 'SQL Server'], accent: 'teal' },
  { icon: 'network' as const, name: 'Redes y TI', code: 'NET-04', skills: ['Cisco', 'Gestión de redes', 'Infraestructura TI'], accent: 'violet' },
  { icon: 'tools' as const, name: 'Herramientas', code: 'OPS-05', skills: ['Git', 'GitHub', 'Linux', 'Microsoft Office'], accent: 'teal' },
];

export default function Skills() {
  return (
    <section id="skills" className="relative border-y border-white/[0.035] bg-card/[0.22] py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="03"
          eyebrow="habilidades"
          title="Capacidades conectadas, no herramientas aisladas."
          description="Un stack práctico para analizar riesgos, construir soluciones y sostener infraestructura digital."
        />
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {categories.map((category, index) => (
            <StaggerItem key={category.name} className={index < 3 ? 'xl:col-span-2' : index === 3 ? 'xl:col-span-3' : 'xl:col-span-3'}>
              <TiltCard className="h-full rounded-2xl border border-border-dim bg-card p-6 transition-colors duration-300 hover:border-white/20 sm:p-7">
                <div className="relative z-20 flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${category.accent === 'teal' ? 'border-teal/25 bg-teal/[0.07] text-teal' : 'border-violet/25 bg-violet/[0.07] text-violet'}`}>
                    <TechIcon name={category.icon} />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted">{category.code}</span>
                </div>
                <div className="relative z-20 mt-8">
                  <div className="mb-4 flex items-center gap-2" aria-hidden="true">
                    <motion.span className={`h-1.5 w-1.5 rounded-full ${category.accent === 'teal' ? 'bg-teal' : 'bg-violet'}`} whileHover={{ scale: 1.4 }} />
                    <span className="h-px flex-1 bg-gradient-to-r from-border-dim to-transparent" />
                    <span className="h-2 w-2 rotate-45 border border-border-dim" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{category.name}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="rounded-md border border-white/[0.07] bg-void/55 px-2.5 py-1.5 font-mono text-[10px] text-text-muted transition group-hover:text-text-prime sm:text-xs">{skill}</span>
                    ))}
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
