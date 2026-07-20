import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { MathUtils } from 'three';
import type { Group } from 'three';

type ParticleFieldProps = {
  compact: boolean;
  reducedMotion: boolean;
};

export default function ParticleField({ compact, reducedMotion }: ParticleFieldProps) {
  const group = useRef<Group>(null);
  const count = reducedMotion ? 28 : compact ? 68 : 132;
  const { positions, anchors, connections } = useMemo(() => {
    const points = new Float32Array(count * 3);
    const anchorPoints: number[] = [];
    const seeded = (index: number, salt: number) => {
      const value = Math.sin(index * 9283.11 + salt * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };
    const spreadX = compact ? 3.45 : 13.5;
    const spreadY = compact ? 9 : 7.6;

    for (let index = 0; index < count; index += 1) {
      const x = (seeded(index, 1) - 0.5) * spreadX;
      const y = (seeded(index, 2) - 0.5) * spreadY;
      const z = (seeded(index, 3) - 0.5) * 2.8 - 3.1;
      points.set([x, y, z], index * 3);
      if (index % 7 === 0) anchorPoints.push(x, y, z + 0.04);
    }

    const links: number[] = [];
    const threshold = compact ? 1.05 : 1.65;
    const maxLinks = compact ? 74 : 160;
    for (let index = 0; index < count && links.length / 6 < maxLinks; index += 1) {
      const nearby: { index: number; distance: number }[] = [];
      const ax = points[index * 3];
      const ay = points[index * 3 + 1];
      const az = points[index * 3 + 2];
      for (let next = index + 1; next < count; next += 1) {
        const distance = Math.hypot(ax - points[next * 3], ay - points[next * 3 + 1], az - points[next * 3 + 2]);
        if (distance < threshold) nearby.push({ index: next, distance });
      }
      nearby.sort((a, b) => a.distance - b.distance).slice(0, 2).forEach(({ index: next }) => {
        links.push(ax, ay, az, points[next * 3], points[next * 3 + 1], points[next * 3 + 2]);
      });
    }

    return {
      positions: points,
      anchors: new Float32Array(anchorPoints),
      connections: new Float32Array(links),
    };
  }, [compact, count]);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reducedMotion) return;
    const time = clock.getElapsedTime();
    group.current.position.x = MathUtils.damp(group.current.position.x, pointer.x * (compact ? 0.08 : 0.2), 2.4, delta);
    group.current.position.y = MathUtils.damp(group.current.position.y, pointer.y * (compact ? 0.08 : 0.16), 2.4, delta);
    group.current.rotation.y = Math.sin(time * 0.09) * 0.018 + pointer.x * 0.012;
    group.current.rotation.z = Math.sin(time * 0.07) * 0.012;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={compact ? 0.06 : 0.075} color="#FFFFFF" transparent opacity={0.78} sizeAttenuation depthWrite={false} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[anchors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={compact ? 0.13 : 0.17} color="#FFFFFF" transparent opacity={0.96} sizeAttenuation depthWrite={false} />
      </points>
      {connections.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connections, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#FFFFFF" transparent opacity={compact ? 0.18 : 0.16} depthWrite={false} />
        </lineSegments>
      )}
    </group>
  );
}
