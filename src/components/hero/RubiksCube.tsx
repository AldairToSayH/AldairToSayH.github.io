import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { MathUtils } from 'three';
import type { Group } from 'three';

type RubiksCubeProps = {
  reducedMotion: boolean;
  shadows: boolean;
};

type Vector3Tuple = [number, number, number];
type CubiePosition = Vector3Tuple;
type FaceName = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';
type SurfaceKind = 'gloss' | 'satin' | 'rough' | 'brushed' | 'grid' | 'silver';

const positions = [-1, 0, 1].flatMap((x) =>
  [-1, 0, 1].flatMap((y) => [-1, 0, 1].map((z) => [x, y, z] as CubiePosition)),
);

const surfaceCycle: SurfaceKind[] = ['gloss', 'satin', 'rough', 'brushed', 'grid'];
const faceCodes: Record<FaceName, number> = { right: 2, left: 3, top: 5, bottom: 7, front: 11, back: 13 };

function getSurfaceKind([x, y, z]: CubiePosition, face: FaceName): SurfaceKind {
  const hash = Math.abs((x + 2) * 17 + (y + 2) * 23 + (z + 2) * 29 + faceCodes[face] * 7);
  return hash % 19 === 0 ? 'silver' : surfaceCycle[hash % surfaceCycle.length];
}

export default function RubiksCube({ reducedMotion, shadows }: RubiksCubeProps) {
  const root = useRef<Group>(null);
  const twistLayer = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const staticCubies = useMemo(() => positions.filter(([x]) => x !== 1), []);
  const faceCubies = useMemo(() => positions.filter(([x]) => x === 1), []);

  useFrame(({ clock, pointer }, delta) => {
    if (!root.current) return;
    const time = clock.getElapsedTime();
    const cursorX = reducedMotion ? 0 : pointer.y * 0.1;
    const cursorY = reducedMotion ? 0 : pointer.x * 0.14;

    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, -0.3 + cursorX + (reducedMotion ? 0 : Math.sin(time * 0.32) * 0.08), 4, delta);
    root.current.rotation.y = MathUtils.damp(root.current.rotation.y, 0.58 + cursorY + (reducedMotion ? 0 : time * 0.13), 3.2, delta);
    root.current.rotation.z = MathUtils.damp(root.current.rotation.z, 0.08 + (reducedMotion ? 0 : Math.sin(time * 0.28) * 0.045), 4, delta);
    root.current.position.y = MathUtils.damp(root.current.position.y, reducedMotion ? 0 : Math.sin(time * 0.62) * 0.08, 3, delta);
    root.current.scale.setScalar(MathUtils.damp(root.current.scale.x, hovered && !reducedMotion ? 1.035 : 1, 6, delta));

    if (twistLayer.current) {
      const cycle = time % 6.5;
      const smooth = (value: number) => value * value * (3 - 2 * value);
      let progress = 0;
      if (cycle < 1.1) progress = smooth(cycle / 1.1);
      else if (cycle < 1.8) progress = 1;
      else if (cycle < 3) progress = 1 - smooth((cycle - 1.8) / 1.2);

      twistLayer.current.rotation.x = reducedMotion ? 0 : progress * (Math.PI / 2);
      twistLayer.current.position.x = reducedMotion ? 0 : Math.sin(progress * Math.PI) * 0.045;
    }
  });

  return (
    <group
      ref={root}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {staticCubies.map((position) => <Cubie key={position.join('-')} position={position} shadows={shadows} />)}
      <group ref={twistLayer}>
        {faceCubies.map((position) => <Cubie key={position.join('-')} position={position} shadows={shadows} />)}
      </group>
    </group>
  );
}

function Cubie({ position: [x, y, z], shadows }: { position: CubiePosition; shadows: boolean }) {
  const position: CubiePosition = [x, y, z];
  const gap = 0.94;
  const offset = 0.458;
  const panelSize = 0.775;

  return (
    <group position={[x * gap, y * gap, z * gap]}>
      <RoundedBox args={[0.86, 0.86, 0.86]} radius={0.055} smoothness={2} castShadow={shadows} receiveShadow={shadows}>
        <meshPhysicalMaterial color="#020202" roughness={0.38} metalness={0.48} clearcoat={0.34} clearcoatRoughness={0.4} />
      </RoundedBox>
      {x === 1 && <Panel kind={getSurfaceKind(position, 'right')} position={[offset, 0, 0]} rotation={[0, Math.PI / 2, 0]} size={panelSize} shadows={shadows} />}
      {x === -1 && <Panel kind={getSurfaceKind(position, 'left')} position={[-offset, 0, 0]} rotation={[0, -Math.PI / 2, 0]} size={panelSize} shadows={shadows} />}
      {y === 1 && <Panel kind={getSurfaceKind(position, 'top')} position={[0, offset, 0]} rotation={[-Math.PI / 2, 0, 0]} size={panelSize} shadows={shadows} />}
      {y === -1 && <Panel kind={getSurfaceKind(position, 'bottom')} position={[0, -offset, 0]} rotation={[Math.PI / 2, 0, 0]} size={panelSize} shadows={shadows} />}
      {z === 1 && <Panel kind={getSurfaceKind(position, 'front')} position={[0, 0, offset]} rotation={[0, 0, 0]} size={panelSize} shadows={shadows} />}
      {z === -1 && <Panel kind={getSurfaceKind(position, 'back')} position={[0, 0, -offset]} rotation={[0, Math.PI, 0]} size={panelSize} shadows={shadows} />}
    </group>
  );
}

function Panel({ kind, position, rotation, size, shadows }: { kind: SurfaceKind; position: Vector3Tuple; rotation: Vector3Tuple; size: number; shadows: boolean }) {
  const isGloss = kind === 'gloss';
  const isSilver = kind === 'silver';

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[size, size, 0.05]} radius={0.035} smoothness={2} castShadow={shadows} receiveShadow={shadows}>
        <meshPhysicalMaterial
          color={isSilver ? '#8A8A86' : isGloss ? '#020202' : kind === 'rough' ? '#101010' : '#080808'}
          roughness={isSilver ? 0.7 : isGloss ? 0.14 : kind === 'rough' ? 0.92 : kind === 'satin' ? 0.48 : 0.58}
          metalness={isSilver ? 0.78 : isGloss ? 0.72 : kind === 'rough' ? 0.18 : 0.52}
          clearcoat={isGloss ? 0.92 : kind === 'satin' ? 0.24 : 0}
          clearcoatRoughness={isGloss ? 0.12 : 0.46}
        />
      </RoundedBox>
      {kind === 'brushed' && <BrushedPattern size={size} />}
      {kind === 'grid' && <GridPattern size={size} />}
    </group>
  );
}

function BrushedPattern({ size }: { size: number }) {
  return (
    <group position={[0, 0, 0.031]}>
      {[-3, -2, -1, 0, 1, 2, 3].map((line) => (
        <mesh key={line} position={[0, line * size * 0.095, 0]}>
          <boxGeometry args={[size * 0.78, 0.008, 0.006]} />
          <meshStandardMaterial color="#222222" roughness={0.72} metalness={0.62} />
        </mesh>
      ))}
    </group>
  );
}

function GridPattern({ size }: { size: number }) {
  const lines = [-2, -1, 0, 1, 2];
  return (
    <group position={[0, 0, 0.031]}>
      {lines.map((line) => (
        <group key={line}>
          <mesh position={[line * size * 0.13, 0, 0]}>
            <boxGeometry args={[0.007, size * 0.72, 0.005]} />
            <meshStandardMaterial color="#252525" roughness={0.76} metalness={0.35} />
          </mesh>
          <mesh position={[0, line * size * 0.13, 0]}>
            <boxGeometry args={[size * 0.72, 0.007, 0.005]} />
            <meshStandardMaterial color="#252525" roughness={0.76} metalness={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
