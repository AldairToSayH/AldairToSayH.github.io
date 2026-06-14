import React, { useEffect, useRef, useState } from 'react';

const socials = [
  { icon: '📧', label: 'zavalapisxlpo@gmail.com', href: 'mailto:zavalapisxlpo@gmail.com', external: false },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/aldair-zavala-h-b18a68378', external: true },
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/AldairToSayH', external: true },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/51971328247', external: true },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasGesture, setHasGesture] = useState(false);

  useEffect(() => {
    const audio = new Audio('/audio/contact-ambient.mp3');
    audio.loop = true;
    audio.volume = 0.28;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    const isMobileLike = window.matchMedia('(pointer: coarse)').matches;

    if (!isInView || isMuted) {
      audio.pause();
      return;
    }

    if (isMobileLike && !hasGesture) return;

    audio.play().catch(() => {
      audio.pause();
    });
  }, [hasGesture, isInView, isMuted]);

  const handleSectionClick = () => {
    setHasGesture(true);
    if (isInView && !isMuted) {
      audioRef.current?.play().catch(() => undefined);
    }
  };

  const toggleAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setHasGesture(true);
    setIsMuted((current) => !current);
  };

  return (
    <section id="contact" ref={sectionRef} onClick={handleSectionClick} className="relative overflow-hidden px-5 py-24 sm:px-8">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent" aria-hidden="true" />
      <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-teal/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-border-dim bg-card/65 p-6 backdrop-blur sm:p-8">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-teal">// contacto</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Conectemos</h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Si tienes una oportunidad, colaboracion o idea tecnica que necesita seguridad, software o infraestructura confiable, escribeme. Estoy listo para construir soluciones con impacto real.
          </p>

          <div className="mt-8 grid gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.external ? '_blank' : undefined}
                rel={social.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl border border-border-dim bg-void/50 px-4 py-4 text-text-prime transition hover:border-teal hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
              >
                <span className="text-2xl" aria-hidden="true">{social.icon}</span>
                <span className="font-display font-semibold">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <form action="mailto:zavalapisxlpo@gmail.com" method="post" encType="text/plain" className="rounded-3xl border border-border-dim bg-card p-6 shadow-glow-v sm:p-8">
          <div className="grid gap-5">
            <label className="grid gap-2 font-mono text-sm text-teal">
              Nombre
              <input
                required
                name="nombre"
                type="text"
                className="rounded-xl border border-border-dim bg-void px-4 py-3 font-body text-text-prime outline-none transition placeholder:text-text-muted focus:border-teal focus:ring-2 focus:ring-teal/30"
                placeholder="Tu nombre"
              />
            </label>
            <label className="grid gap-2 font-mono text-sm text-teal">
              Correo
              <input
                required
                name="correo"
                type="email"
                className="rounded-xl border border-border-dim bg-void px-4 py-3 font-body text-text-prime outline-none transition placeholder:text-text-muted focus:border-teal focus:ring-2 focus:ring-teal/30"
                placeholder="tu@email.com"
              />
            </label>
            <label className="grid gap-2 font-mono text-sm text-teal">
              Mensaje
              <textarea
                required
                name="mensaje"
                rows={6}
                className="resize-none rounded-xl border border-border-dim bg-void px-4 py-3 font-body text-text-prime outline-none transition placeholder:text-text-muted focus:border-teal focus:ring-2 focus:ring-teal/30"
                placeholder="Cuéntame sobre tu proyecto o propuesta"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-violet px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white shadow-glow-v transition hover:scale-[1.02] hover:bg-violet/90 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-card"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>

      <button
        type="button"
        onClick={toggleAudio}
        className="absolute bottom-6 right-6 rounded-full border border-border-dim bg-void/90 p-4 text-2xl shadow-glow-v backdrop-blur transition hover:border-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
        aria-label={isMuted ? 'Activar musica ambiental' : 'Silenciar musica ambiental'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </section>
  );
};

export default Contact;
