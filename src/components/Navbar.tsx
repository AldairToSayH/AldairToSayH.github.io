import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { requestContactAudio } from './contactAudio';
import ScrollProgress from './motion/ScrollProgress';

const links = [
  { href: '#home', label: 'Inicio' },
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#certifications', label: 'Certificaciones' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href)).filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-32% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => firstMobileLinkRef.current?.focus(), reduceMotion ? 0 : 180);

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, reduceMotion]);

  const handleNavigate = (href: string) => {
    if (href === '#contact') requestContactAudio();
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${isOpen ? 'border-border-dim bg-[#050505] shadow-[0_12px_50px_rgba(0,0,0,.75)]' : scrolled ? 'border-border-dim bg-black/[0.92] shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navegación principal">
        <button type="button" onClick={() => handleNavigate('#home')} className="group flex items-center gap-3 rounded-md font-mono font-bold" aria-label="Ir al inicio">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-violet/35 bg-black transition group-hover:border-teal/45">
            <img src="/image/me.gif" alt="" width="184" height="184" className="h-full w-full scale-[1.08] object-cover" />
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-text-muted sm:block">System portfolio</span>
        </button>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const active = activeSection === link.href.slice(1);
            return (
              <button key={link.href} type="button" onClick={() => handleNavigate(link.href)} className={`relative rounded-lg px-3 py-2 font-display text-xs font-semibold transition ${active ? 'text-white' : 'text-text-muted hover:text-teal'}`} aria-current={active ? 'page' : undefined}>
                {active && <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-lg border border-white/[0.07] bg-white/[0.035]" transition={{ type: 'spring', stiffness: 360, damping: 32 }} />}
                {link.label}
                {active && <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-teal" />}
              </button>
            );
          })}
        </div>

        <button ref={menuButtonRef} type="button" onClick={() => setIsOpen((value) => !value)} className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border-dim bg-card/75 text-text-prime xl:hidden" aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isOpen} aria-controls="mobile-navigation">
          <span className="sr-only">Menú</span>
          <span className="relative h-4 w-5" aria-hidden="true">
            <motion.span className="absolute left-0 top-0.5 h-px w-5 bg-current" animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span className="absolute left-0 top-[7.5px] h-px w-5 bg-current" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="absolute left-0 top-[14px] h-px w-5 bg-current" animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div id="mobile-navigation" className="fixed inset-x-0 top-[4.5rem] h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-[#050505] px-5 py-7 shadow-[0_30px_80px_rgba(0,0,0,.85)] xl:hidden" initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top_left,rgba(108,99,255,.09),transparent_62%)]" aria-hidden="true" />
            <div className="relative mx-auto grid max-w-7xl gap-1">
              {links.map((link, index) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <motion.button ref={index === 0 ? firstMobileLinkRef : undefined} key={link.href} type="button" onClick={() => handleNavigate(link.href)} className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-left font-display text-base font-semibold ${active ? 'border-teal/20 bg-teal/[0.06] text-teal' : 'border-transparent text-text-muted hover:bg-card hover:text-white'}`} initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.035 }}>
                    <span><span className="mr-4 font-mono text-[9px] text-violet">0{index + 1}</span>{link.label}</span><span aria-hidden="true">{active ? '●' : '→'}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollProgress />
    </header>
  );
}
