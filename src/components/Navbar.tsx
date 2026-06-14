import React, { useEffect, useState } from 'react';

const links = [
  { href: '#home', label: 'Inicio' },
  { href: '#about', label: 'Sobre mi' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#certifications', label: 'Certificaciones' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (href: string) => {
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border-dim bg-void/78 shadow-glow-v backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Navegacion principal">
        <button
          type="button"
          onClick={() => handleNavigate('#home')}
          className="font-mono text-2xl font-bold tracking-tight text-violet transition hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
          aria-label="Ir al inicio"
        >
          AZ
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavigate(link.href)}
                className={`font-display text-sm font-semibold transition hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void ${
                  isActive ? 'text-teal' : 'text-text-muted'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-lg border border-border-dim bg-card/80 p-2 text-text-prime transition hover:border-violet focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void lg:hidden"
          aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          <span className="block h-0.5 w-6 bg-current transition" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current transition" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current transition" />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-border-dim bg-void/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-2 px-5 py-4 sm:px-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavigate(link.href)}
                className={`rounded-lg px-4 py-3 text-left font-display text-sm font-semibold transition hover:bg-card hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal ${
                  isActive ? 'bg-card text-teal' : 'text-text-muted'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
