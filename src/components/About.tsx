import Reveal from './motion/Reveal';
import SectionHeading from './ui/SectionHeading';

const facts = [
  { value: 'Universidad Continental', label: 'Formación' },
  { value: '8.º semestre', label: 'Etapa académica' },
  { value: 'Cusco, Perú', label: 'Ubicación' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-violet/[0.07] blur-3xl" aria-hidden="true" />
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
        <Reveal direction="left" className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[39.375rem]">
            <div className="absolute -inset-5 rounded-[2.25rem] bg-violet/[0.05] blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-2 shadow-[0_28px_90px_rgba(0,0,0,.55)] sm:p-3">
              <div className="relative aspect-[7/5] overflow-hidden rounded-[1.15rem] bg-black">
                <img
                  src="/image/about-me.gif"
                  alt="Animación de un perfil técnico frente a una interfaz digital"
                  width="630"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,.22),transparent_44%,rgba(0,0,0,.16))]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading index="02" eyebrow="sobre mí" title="Tecnología con estructura, seguridad y propósito." />
          <Reveal delay={0.08}>
            <p className="mt-7 text-base leading-8 text-text-muted sm:text-lg">
              Soy Juan Aldair Zavala, estudiante de Ingeniería de Sistemas e Informática, actualmente en octavo semestre. Vivo en Cusco, Perú, y desarrollo soluciones donde convergen la ciberseguridad, el software, los datos y la infraestructura TI.
            </p>
            <p className="mt-4 text-base leading-8 text-text-muted sm:text-lg">
              Me enfoco en crear sistemas confiables, proteger entornos digitales y transformar ideas técnicas en resultados claros para personas y organizaciones.
            </p>
          </Reveal>
          <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-border-dim bg-border-dim sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-card px-5 py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{fact.label}</p>
                <p className="mt-2 font-display text-sm font-semibold text-text-prime">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
