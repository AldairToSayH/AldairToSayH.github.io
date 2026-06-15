import React, { useEffect, useRef, useState } from 'react';

const PREFERENCE_KEY = 'contactMusicPreference';
const WEB3FORMS_ACCESS_KEY = '4b08bbb2-1593-4b50-bdc5-563c0b749103';
const BAR_COUNT = 8;
const IDLE_BARS = [6, 8, 10, 12, 10, 8, 7, 6];

const socials = [
  { icon: '📧', label: 'zavalapisxlpo@gmail.com', href: 'mailto:zavalapisxlpo@gmail.com', external: false },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/aldair-zavala-h-b18a68378', external: true },
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/AldairToSayH', external: true },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/51971328247', external: true },
];

type WindowWithAudioContext = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasGesture, setHasGesture] = useState(false);
  const [bars, setBars] = useState<number[]>(IDLE_BARS);
  const [hasAnalyser, setHasAnalyser] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const stopVisualizer = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setBars(IDLE_BARS);
  };

  const startVisualizer = () => {
    if (prefersReducedMotion || animationFrameRef.current !== null) return;

    const animate = () => {
      const audio = audioRef.current;
      const analyser = analyserRef.current;
      const frequencyData = frequencyDataRef.current;

      if (!audio || audio.paused || !analyser || !frequencyData) {
        animationFrameRef.current = null;
        return;
      }

      analyser.getByteFrequencyData(frequencyData);
      const step = Math.max(1, Math.floor(frequencyData.length / BAR_COUNT));
      const nextBars = Array.from({ length: BAR_COUNT }, (_, index) => {
        const start = index * step;
        let total = 0;

        for (let offset = 0; offset < step; offset += 1) {
          total += frequencyData[start + offset] ?? 0;
        }

        const average = total / step;
        return Math.max(6, Math.min(34, 6 + (average / 255) * 34));
      });

      setBars((currentBars) => currentBars.map((height, index) => height * 0.62 + nextBars[index] * 0.38));
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
  };

  const setupAnalyser = () => {
    const audio = audioRef.current;
    if (!audio || prefersReducedMotion) return false;
    if (analyserRef.current) return true;

    const AudioContextConstructor = window.AudioContext ?? (window as WindowWithAudioContext).webkitAudioContext;
    if (!AudioContextConstructor) return false;

    try {
      const audioContext = audioContextRef.current ?? new AudioContextConstructor();
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.82;

      if (!audioSourceRef.current) {
        audioSourceRef.current = audioContext.createMediaElementSource(audio);
        audioSourceRef.current.connect(analyser);
        analyser.connect(audioContext.destination);
      }

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
      setHasAnalyser(true);
      return true;
    } catch {
      setHasAnalyser(false);
      return false;
    }
  };

  const playAudio = async (allowAudioContext: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    const canAnalyze = allowAudioContext ? setupAnalyser() : false;

    try {
      if (canAnalyze && audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      await audio.play();

      if (canAnalyze) {
        startVisualizer();
      }
    } catch {
      audio.pause();
      stopVisualizer();
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    stopVisualizer();
  };

  useEffect(() => {
    const audio = new Audio('/audio/contact-ambient.mp3');
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      stopVisualizer();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const preference = window.localStorage.getItem(PREFERENCE_KEY);
    setIsMusicOn(preference === 'on');

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener('change', updateMotionPreference);

    return () => motionQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !isMusicOn) {
      pauseAudio();
      return;
    }

    void playAudio(hasGesture);
  }, [hasGesture, isInView, isMusicOn, prefersReducedMotion]);

  const handleSectionClick = () => {
    setHasGesture(true);
    if (isInView && isMusicOn) {
      void playAudio(true);
    }
  };

  const toggleAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setHasGesture(true);
    const nextIsMusicOn = !isMusicOn;

    setIsMusicOn(nextIsMusicOn);
    window.localStorage.setItem(PREFERENCE_KEY, nextIsMusicOn ? 'on' : 'off');

    if (nextIsMusicOn && isInView) {
      void playAudio(true);
      return;
    }

    pauseAudio();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'Nuevo mensaje desde el portafolio de Aldair Zavala',
          from_name: 'Portafolio Aldair Zavala',
          name: formData.get('nombre'),
          email: formData.get('correo'),
          message: formData.get('mensaje'),
          botcheck: formData.get('botcheck'),
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error('Web3Forms submit failed');
      }

      form.reset();
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
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

        <form action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit} className="rounded-3xl border border-border-dim bg-card p-6 shadow-glow-v sm:p-8">
          <div className="grid gap-5">
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
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
              disabled={submitStatus === 'sending'}
              className="rounded-full bg-violet px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white shadow-glow-v transition hover:scale-[1.02] hover:bg-violet/90 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitStatus === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {submitStatus === 'success' && (
              <p className="rounded-2xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm font-medium text-teal" role="status">
                Mensaje enviado correctamente. Te responderé pronto.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="rounded-2xl border border-violet/30 bg-violet/10 px-4 py-3 text-sm font-medium text-text-prime" role="alert">
                No se pudo enviar el mensaje. Inténtalo nuevamente o escríbeme por correo.
              </p>
            )}
            <div
              className={`mt-6 rounded-2xl border bg-white/[0.04] p-4 backdrop-blur-xl transition-all duration-300 sm:flex sm:items-center sm:justify-between sm:gap-4 ${
                isMusicOn
                  ? 'border-teal/40 bg-gradient-to-r from-violet/10 to-teal/10 shadow-[0_0_30px_rgba(0,212,170,0.18)]'
                  : 'border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.18)]'
              }`}
            >
              <div className="flex min-w-0 gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-void/70 text-lg text-teal transition ${
                    isMusicOn ? 'border-teal/40 shadow-[0_0_18px_rgba(0,212,170,0.18)] motion-safe:animate-pulse' : 'border-violet/20'
                  }`}
                  aria-hidden="true"
                >
                  ♪
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-display text-base font-bold text-white">Ambiente de contacto</h3>
                    <div className="flex h-9 items-end gap-1" aria-hidden="true">
                      {bars.map((height, index) => (
                        <span
                          key={index}
                          className={`w-1.5 origin-bottom rounded-full transition-[height,opacity] duration-150 ${
                            isMusicOn ? 'bg-teal/80 opacity-90 shadow-[0_0_10px_rgba(0,212,170,0.2)]' : 'bg-violet/35 opacity-60'
                          }`}
                          style={{
                            height: `${height}px`,
                            animation: isMusicOn && !hasAnalyser && !prefersReducedMotion ? `contact-equalizer ${780 + index * 70}ms ease-in-out infinite` : undefined,
                            animationDelay: `${index * 80}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-text-muted">Audio ambiental suave para esta sección.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className={`mt-4 w-full rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider transition focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-card sm:mt-0 sm:w-auto sm:shrink-0 ${
                  isMusicOn
                    ? 'border-teal/40 bg-teal/10 text-teal hover:bg-teal/15'
                    : 'border-violet/30 bg-violet/5 text-violet hover:bg-violet/10'
                }`}
                aria-label={isMusicOn ? 'Desactivar música ambiental' : 'Activar música ambiental'}
              >
                {isMusicOn ? 'Music On' : 'Music Off'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes contact-equalizer {
            0%, 100% { transform: scaleY(0.45); opacity: 0.55; }
            50% { transform: scaleY(1); opacity: 1; }
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
