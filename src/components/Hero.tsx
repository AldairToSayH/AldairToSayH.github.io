import HeroContent from './hero/HeroContent';
import HeroScene from './hero/HeroScene';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 sm:pb-20 lg:pt-24">
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(255,255,255,.045),transparent_27%),linear-gradient(90deg,rgba(0,0,0,.62)_0%,rgba(0,0,0,.18)_52%,rgba(0,0,0,.06)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-dim to-transparent" aria-hidden="true" />
      <div className="section-shell pointer-events-none relative z-10 grid min-w-0 items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-2">
        <HeroContent />
        <div className="relative order-last h-[23rem] min-w-0 sm:h-[30rem] lg:h-[39rem]">
          <div className="absolute left-4 top-10 font-mono text-[9px] uppercase tracking-[0.2em] text-violet/60 sm:left-8" aria-hidden="true">Visual system / 01</div>
        </div>
      </div>
    </section>
  );
}
