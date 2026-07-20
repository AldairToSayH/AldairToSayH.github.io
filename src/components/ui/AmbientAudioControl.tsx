import { useCallback, useEffect, useRef, useState } from 'react';
import { CONTACT_AUDIO_REQUEST } from '../contactAudio';

type PlaybackState = 'paused' | 'playing' | 'blocked' | 'error';

const meterBars = [9, 15, 12, 19, 14, 17, 11, 16];

export default function AmbientAudioControl() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isInContactRef = useRef(false);
  const navigationIntentRef = useRef(false);
  const [playback, setPlayback] = useState<PlaybackState>('paused');

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    audio.volume = 0.22;
    try {
      await audio.play();
      setPlayback('playing');
    } catch (error) {
      if (!isInContactRef.current) return;
      setPlayback(error instanceof DOMException && error.name === 'NotAllowedError' ? 'blocked' : 'error');
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    audio.pause();
    setPlayback('paused');
  }, []);

  useEffect(() => {
    const section = containerRef.current?.closest<HTMLElement>('#contact');
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      const contactIsActive = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      if (contactIsActive) {
        navigationIntentRef.current = false;
        isInContactRef.current = true;
        void playAudio();
      } else if (!navigationIntentRef.current) {
        isInContactRef.current = false;
        pauseAudio();
      }
    }, { threshold: [0, 0.2] });

    observer.observe(section);
    return () => observer.disconnect();
  }, [pauseAudio, playAudio]);

  useEffect(() => {
    const handleContactRequest = () => {
      navigationIntentRef.current = true;
      isInContactRef.current = true;
      void playAudio();
    };
    const handleVisibility = () => {
      if (document.hidden) pauseAudio();
      else if (isInContactRef.current) void playAudio();
    };

    window.addEventListener(CONTACT_AUDIO_REQUEST, handleContactRequest);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener(CONTACT_AUDIO_REQUEST, handleContactRequest);
      document.removeEventListener('visibilitychange', handleVisibility);
      audioRef.current?.pause();
    };
  }, [pauseAudio, playAudio]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void playAudio();
    else pauseAudio();
  };

  const isPlaying = playback === 'playing';

  return (
    <div ref={containerRef} className="mt-8 border-y border-border-dim py-4" data-audio-playing={isPlaying}>
      <audio ref={audioRef} src="/audio/contact-ambient.mp3" loop preload="metadata" onPause={() => setPlayback('paused')} onPlay={() => setPlayback('playing')} />
      <div className="flex items-center gap-4">
        <div className="flex h-8 shrink-0 items-end gap-1" aria-hidden="true">
          {meterBars.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="ambient-meter-bar w-px origin-bottom bg-white/55"
              style={{ height, animationDelay: `${index * -90}ms` }}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted">Ambient / 01</p>
          <p className="mt-1 font-display text-sm font-semibold text-text-prime">Ambiente de contacto</p>
        </div>
        <button
          type="button"
          onClick={togglePlayback}
          className="min-h-10 shrink-0 rounded-full border border-white/15 px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-text-prime transition hover:border-white/35 hover:bg-white/[0.045] focus-visible:outline-white"
          aria-label={isPlaying ? 'Pausar música ambiental' : 'Reproducir música ambiental'}
        >
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
      </div>
      {playback === 'blocked' && <p className="mt-3 text-xs text-text-muted" role="status">Tu navegador requiere un clic para activar el audio.</p>}
      {playback === 'error' && <p className="mt-3 text-xs text-[#ffaaa4]" role="alert">El navegador no pudo reproducir el audio.</p>}
    </div>
  );
}
