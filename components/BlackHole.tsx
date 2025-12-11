'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader for accretion disk
const AccretionDiskMaterial = shaderMaterial(
  {
    time: 0,
    innerColor: new THREE.Color('#f97316'),
    outerColor: new THREE.Color('#3b82f6'),
    midColor: new THREE.Color('#a855f7'),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying float vDist;
    
    void main() {
      vUv = uv;
      vDist = length(position.xy);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 innerColor;
    uniform vec3 outerColor;
    uniform vec3 midColor;
    varying vec2 vUv;
    varying float vDist;
    
    void main() {
      float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
      float dist = length(vUv - 0.5) * 2.0;
      
      // Spiral pattern
      float spiral = sin(angle * 8.0 + dist * 10.0 - time * 2.0) * 0.5 + 0.5;
      float spiral2 = sin(angle * 4.0 - dist * 8.0 + time * 1.5) * 0.5 + 0.5;
      
      // Color mixing based on distance
      vec3 color = mix(innerColor, midColor, dist);
      color = mix(color, outerColor, dist * dist);
      
      // Add spiral brightness variation
      float brightness = spiral * 0.3 + spiral2 * 0.2 + 0.5;
      color *= brightness;
      
      // Fade at edges
      float alpha = smoothstep(1.0, 0.3, dist) * smoothstep(0.0, 0.15, dist);
      alpha *= 0.8;
      
      // Add inner glow
      float innerGlow = smoothstep(0.3, 0.0, dist);
      color += innerColor * innerGlow * 0.5;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ AccretionDiskMaterial });

// Type declaration for custom material
declare module '@react-three/fiber' {
  interface ThreeElements {
    accretionDiskMaterial: JSX.IntrinsicElements['shaderMaterial'] & {
      time?: number;
      innerColor?: THREE.Color;
      outerColor?: THREE.Color;
      midColor?: THREE.Color;
    };
  }
}

function AccretionDisk() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.2, 0, 0]} position={[0, 0, 0]}>
      <ringGeometry args={[1.5, 6, 128, 1]} />
      <accretionDiskMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function EventHorizon() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

function PhotonSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.8, 0.02, 16, 100]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
    </mesh>
  );
}

function OrbitingParticle({ 
  radius, 
  speed, 
  color, 
  size = 0.08,
  offset = 0 
}: { 
  radius: number; 
  speed: number; 
  color: string;
  size?: number;
  offset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function RelativisticJet({ direction = 1 }: { direction?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const spread = t * 0.5;
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = direction * (t * 8 + 2);
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    
    return positions;
  }, [direction]);

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#06b6d4"
          size={0.05}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function GravitationalLensing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2.5, 0.01, 16, 100]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 10, 50]} />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Main black hole components */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group>
          <EventHorizon />
          <PhotonSphere />
          <AccretionDisk />
          <GravitationalLensing />
          
          {/* Relativistic jets */}
          <RelativisticJet direction={1} />
          <RelativisticJet direction={-1} />
          
          {/* Orbiting particles - representing platforms */}
          <OrbitingParticle radius={4} speed={0.3} color="#3b82f6" size={0.12} offset={0} />
          <OrbitingParticle radius={4.5} speed={0.25} color="#f97316" size={0.1} offset={Math.PI / 3} />
          <OrbitingParticle radius={5} speed={0.2} color="#a855f7" size={0.11} offset={Math.PI * 2 / 3} />
          <OrbitingParticle radius={5.5} speed={0.15} color="#06b6d4" size={0.09} offset={Math.PI} />
          <OrbitingParticle radius={6} speed={0.12} color="#22c55e" size={0.1} offset={Math.PI * 4 / 3} />
          <OrbitingParticle radius={6.5} speed={0.1} color="#ec4899" size={0.08} offset={Math.PI * 5 / 3} />
          <OrbitingParticle radius={7} speed={0.08} color="#eab308" size={0.07} offset={Math.PI / 6} />
        </group>
      </Float>
      
      {/* Ambient light */}
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function BlackHole() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 3, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
