import React, { useEffect, useRef, useState } from 'react';

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number;
};

const roles = ['Entusiasta en Ciberseguridad', 'Desarrollador de Software', 'Apasionado en redes e Infraestructura TI', 'Competente en Infraestructura TI', '🤪​Portafolio en Betaaa!!'];

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 38 : 72;

    const timer = window.setTimeout(() => {
      if (!isDeleting && visibleChars < currentRole.length) {
        setVisibleChars((count) => count + 1);
        return;
      }

      if (!isDeleting && visibleChars === currentRole.length) {
        window.setTimeout(() => setIsDeleting(true), 900);
        return;
      }

      if (isDeleting && visibleChars > 0) {
        setVisibleChars((count) => count - 1);
        return;
      }

      setIsDeleting(false);
      setRoleIndex((index) => (index + 1) % roles.length);
    }, speed);

    return () => window.clearTimeout(timer);
  }, [isDeleting, roleIndex, visibleChars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    const createDots = () => {
      dots = Array.from({ length: 60 }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 1.8 + 0.8,
        color: index % 2 === 0 ? '#6C63FF' : '#00D4AA',
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createDots();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#0A0A0F';
      context.fillRect(0, 0, width, height);

      dots.forEach((dot, index) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        for (let nextIndex = index + 1; nextIndex < dots.length; nextIndex += 1) {
          const next = dots[nextIndex];
          const dx = dot.x - next.x;
          const dy = dot.y - next.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.22;
            context.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }

        const pulse = 0.3 + Math.sin(time * 0.001 + dot.phase) * 0.2;
        const alpha = Math.max(0.3, Math.min(0.5, pulse + 0.25));
        context.fillStyle = dot.color === '#6C63FF' ? `rgba(108, 99, 255, ${alpha})` : `rgba(0, 212, 170, ${alpha})`;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size + pulse, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 py-28 sm:px-8">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#6C63FF22,transparent_32%),radial-gradient(circle_at_80%_70%,#00D4AA18,transparent_30%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-4xl text-center md:text-left">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.28em] text-teal sm:text-base">Ingeniero de Sistemas · Cusco, Peru</p>
          <h1 className="mt-6 font-display text-6xl font-bold leading-none tracking-tight text-white sm:text-7xl md:text-8xl">Aldair Zavala</h1>
          <p className="mt-7 min-h-12 font-mono text-xl text-text-prime sm:text-2xl">
            {roles[roleIndex].slice(0, visibleChars)}
            <span className="ml-1 animate-pulse text-teal">|</span>
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <button
              type="button"
              onClick={() => scrollTo('#projects')}
              className="rounded-full bg-violet px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-white shadow-glow-v transition hover:scale-105 hover:bg-violet/90 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
            >
              Ver mis proyectos
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="rounded-full border border-teal px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-teal transition hover:scale-105 hover:bg-teal hover:text-void focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
            >
              Contactame
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-teal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-void"
        aria-label="Bajar a la seccion sobre mi"
      >
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14m0 0 7-7m-7 7-7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
