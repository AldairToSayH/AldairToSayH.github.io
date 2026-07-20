import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';

type FloatingGeometryProps = {
  compact: boolean;
  reducedMotion: boolean;
};

export default function FloatingGeometry({ compact, reducedMotion }: FloatingGeometryProps) {
  const group = useRef<Group>(null);
  const torus = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const time = clock.getElapsedTime();
    if (group.current) group.current.rotation.y = Math.sin(time * 0.13) * 0.08;
    if (torus.current) {
      torus.current.rotation.x = time * 0.09;
      torus.current.rotation.z = time * 0.07;
    }
  });

  if (compact) {
    return (
      <group position={[0, 0, -1.8]}>
        <mesh position={[2.15, 1.65, 0]} rotation={[0.4, 0.2, 0.3]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial color="#FFFFFF" wireframe transparent opacity={0.13} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={group} position={[0, 0, -1.4]}>
      <mesh position={[-2.7, 1.55, -0.8]} rotation={[0.3, 0.5, 0.1]}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color="#FFFFFF" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={torus} position={[2.75, 1.4, -0.4]} rotation={[0.3, 0.3, 0]}>
        <torusGeometry args={[0.5, 0.055, 10, 36]} />
        <meshStandardMaterial color="#D6D6D6" transparent opacity={0.16} roughness={0.55} />
      </mesh>
      <mesh position={[2.65, -1.55, -1]} rotation={[0.35, 0.15, 0.5]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#F0F0F0" wireframe transparent opacity={0.13} />
      </mesh>
      {[2.15, 2.55].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2.25 + index * 0.12, index * 0.3, 0]}>
          <torusGeometry args={[radius, 0.009, 4, 96]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={index === 0 ? 0.08 : 0.055} />
        </mesh>
      ))}
      <NodeNetwork />
    </group>
  );
}

function NodeNetwork() {
  const nodes: [number, number, number][] = [[-3, -1.25, -0.5], [-2.3, -1.7, -0.2], [-1.8, -1.05, -0.8], [-2.55, -0.65, -1]];
  const lines = new Float32Array([...
    nodes[0], ...nodes[1], ...nodes[1], ...nodes[2], ...nodes[2], ...nodes[3], ...nodes[3], ...nodes[0], ...nodes[0], ...nodes[2],
  ]);

  return (
    <group>
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.32} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#FFFFFF" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}
