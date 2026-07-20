import { PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { Component, Suspense, useEffect, useRef, useState } from 'react';
import type { ErrorInfo, PropsWithChildren } from 'react';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';
import RubiksCube from './RubiksCube';
import SceneFallback from './SceneFallback';

type SceneBoundaryState = { failed: boolean };

class SceneBoundary extends Component<PropsWithChildren, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [available, setAvailable] = useState<boolean | null>(null);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    setAvailable(supportsWebGL());
    const media = window.matchMedia('(max-width: 1023px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '100px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const animate = active && pageVisible && !reduceMotion;

  return (
    <div ref={container} className="absolute inset-0 z-0 h-full w-full" aria-label="Cubo de Rubik tridimensional y red de partículas interactivas">
      <div className="pointer-events-none absolute bottom-[8%] right-[4%] h-[44%] w-[56%] rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,.055),transparent_67%)] blur-2xl" aria-hidden="true" />
      {available === false ? (
        <SceneFallback />
      ) : (
        <SceneBoundary>
          <Canvas
            className="touch-none"
            dpr={[1, 1.5]}
            frameloop={animate ? 'always' : 'demand'}
            shadows={!compact && !reduceMotion}
            camera={{ position: [0, 0, compact ? 11.5 : 8], fov: compact ? 40 : 38, near: 0.1, far: 50 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            aria-hidden="true"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[4, 5, 6]} intensity={2.45} color="#FFFFFF" castShadow={!compact && !reduceMotion} shadow-mapSize={[512, 512]} />
              <pointLight position={[-4, 1, 3]} intensity={3.5} distance={9} color="#D8D8D8" />
              <pointLight position={[4, -2, 2]} intensity={2.6} distance={8} color="#F0F0F0" />
              <ParticleField compact={compact} reducedMotion={reduceMotion} />
              <group position={compact ? [0, -2.55, 0] : [2.45, 0, 0]} scale={compact ? 0.56 : 0.78}>
                <FloatingGeometry compact={compact} reducedMotion={reduceMotion} />
                <PresentationControls
                  global={false}
                  cursor
                  enabled={!reduceMotion}
                  snap={{ mass: 1, tension: 150 }}
                  speed={0.9}
                  zoom={1}
                  polar={[-0.5, 0.5]}
                  azimuth={[-0.75, 0.75]}
                >
                  <RubiksCube reducedMotion={reduceMotion} shadows={!compact && !reduceMotion} />
                </PresentationControls>
              </group>
            </Suspense>
          </Canvas>
        </SceneBoundary>
      )}
      <div className="pointer-events-none absolute bottom-[9%] right-[13%] hidden items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted backdrop-blur lg:flex" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" /> Arrastra para explorar
      </div>
    </div>
  );
}
