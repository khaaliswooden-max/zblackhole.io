'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { ChartMetric } from '@/lib/benchmarks';

// ─── Animated bar ────────────────────────────────────────────────────────────

function Bar({
  metric,
  index,
  total,
}: {
  metric: ChartMetric;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scaleY = useRef(0.001);
  const maxH = 3; // max visual height in scene units

  useFrame(() => {
    if (!meshRef.current) return;
    scaleY.current = THREE.MathUtils.lerp(scaleY.current, metric.normalized, 0.06);
    meshRef.current.scale.y = scaleY.current;
    meshRef.current.position.y = (scaleY.current * maxH) / 2;
  });

  const spacing = 1.4;
  const x = (index - (total - 1) / 2) * spacing;

  // Color: low → fg-muted grey, high → chain-color green
  const color = new THREE.Color().lerpColors(
    new THREE.Color('#888880'),
    new THREE.Color('#4ade80'),
    metric.normalized
  );

  return (
    <group position={[x, 0, 0]}>
      {/* Bar */}
      <mesh ref={meshRef} scale={[1, 0.001, 1]}>
        <boxGeometry args={[0.8, maxH, 0.8]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Raw value label above bar */}
      <Html
        position={[0, maxH * metric.normalized + 0.35, 0]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <span
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '9px',
            color: '#555550',
            whiteSpace: 'nowrap',
          }}
        >
          {metric.rawValue}
        </span>
      </Html>

      {/* Label below bar */}
      <Html position={[0, -0.4, 0]} center style={{ pointerEvents: 'none' }}>
        <span
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '9px',
            color: '#888880',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {metric.label}
        </span>
      </Html>
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────

function Scene({ metrics }: { metrics: ChartMetric[] }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -3]} intensity={0.3} />

      {/* Floor grid line */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry
          args={[metrics.length * 1.4 + 1, 2]}
        />
        <meshStandardMaterial color="#d0d0ce" transparent opacity={0.3} />
      </mesh>

      {metrics.map((m, i) => (
        <Bar key={m.label} metric={m} index={i} total={metrics.length} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

// ─── Lazy-mounted canvas ──────────────────────────────────────────────────────

export default function BenchmarkChart3D({ metrics }: { metrics: ChartMetric[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: 280, background: 'var(--bg)' }}
    >
      {mounted ? (
        <Canvas
          camera={{ position: [0, 2.5, 8], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene metrics={metrics} />
        </Canvas>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '10px',
              color: 'var(--fg-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Loading chart…
          </span>
        </div>
      )}
    </div>
  );
}
