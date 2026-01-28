import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars, Sparkles } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8} position={[2, 0, -2]}>
        <MeshDistortMaterial
          color="#3F5E96"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 600;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      const color = new THREE.Color();
      color.setHSL(0.55 + Math.random() * 0.1, 0.6, 0.5 + Math.random() * 0.2);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Torus() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={torusRef} position={[-3, 1, -4]} scale={0.5}>
        <torusGeometry args={[1, 0.3, 16, 40]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#7dd3fc"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[4, -1, -3]} scale={0.4}>
        <icosahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#a5b4fc"
          emissive="#a5b4fc"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 rounded-[1.8rem] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#7dd3fc" />
          <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3F5E96" />
          
          <AnimatedSphere />
          <Torus />
          <Icosahedron />
          <FloatingParticles />
          
          <Sparkles
            count={50}
            scale={12}
            size={2}
            speed={0.3}
            opacity={0.4}
            color="#7dd3fc"
          />
          
          <Stars radius={80} depth={40} count={1500} factor={3} saturation={0.3} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}