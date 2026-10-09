import { motion, useReducedMotion } from 'motion/react';
import { StaggerGroup, StaggerItem } from './motion/StaggerGroup';
import SectionHeading from './ui/SectionHeading';

const certifications = [
  { name: 'Ciberseguridad en Pentesting Web (C|PW)', institution: 'UNI Lima', year: '2025', href: 'https://certificados.uni.edu.pe/verificador/search.php?cert_id=cert_029e360048d4ed7ce38a243ecca9a5db', area: 'SECURITY' },
  { name: 'Hacking Ético + IA (C|EH)', institution: 'UNI Lima', year: '2025', href: 'https://certificados.uni.edu.pe/verificador/search.php?cert_id=cert_31f22992ae51d4dd9995de843471147d', area: 'SECURITY' },
  { name: 'Machine Learning con Python + IA', institution: 'UNI Lima', year: '2025', href: 'https://certificados.uni.edu.pe/verificador/search.php?cert_id=cert_7da9715547cc1270c5ad9e9d912fe550', area: 'DATA' },
  { name: 'CCNA: Introducción a Redes', institution: 'Universidad Continental', year: '2025', href: 'https://media.licdn.com/dms/image/v2/D4D2DAQG-GATUdlAFhA/profile-treasury-document-images_1280/B4DZ3Fym.NHIAU-/1/1777139873199?e=1785369600&v=beta&t=sgsjZ9tD5DwInf6DSxMrlreDhEvNHKQV599EMoSJ6hs', area: 'NETWORKS' },
];

export default function Certifications() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="certifications" className="relative border-y border-white/[0.035] bg-card/[0.18] py-24 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading title="Aprendizaje verificado y en evolución." />
          <p className="max-w-sm font-mono text-[10px] uppercase leading-6 tracking-[0.17em] text-text-muted">Credenciales externas · enlaces de verificación disponibles</p>
        </div>
        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {certifications.map((certification, index) => (
            <StaggerItem key={certification.name}>
              <a href={certification.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-2xl border border-border-dim bg-card p-6 transition hover:border-violet/45 sm:p-7">
                <motion.span
                  className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-violet/35 font-mono text-[9px] text-violet"
                  initial={{ rotate: reduceMotion ? 0 : -18, scale: reduceMotion ? 1 : 0.8 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: index * 0.08 }}
                >
                  {certification.year.slice(2)}
                </motion.span>
                <div>
                  <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                    <span className="text-teal">{certification.area}</span><span className="h-px w-7 bg-border-dim" />{certification.institution}
                  </div>
                  <h3 className="mt-8 max-w-md pr-12 font-display text-xl font-bold leading-8 text-white transition group-hover:text-teal sm:text-2xl">{certification.name}</h3>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border-dim pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  <span>Emitida en {certification.year}</span><span className="text-violet transition-transform group-hover:translate-x-1">Verificar →</span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
