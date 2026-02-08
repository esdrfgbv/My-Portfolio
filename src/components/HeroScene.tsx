import { useRef, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingGeo = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.4, 1]} />
      <MeshDistortMaterial color={color} speed={2} distort={0.3} roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const DeskSetup = () => {
  const screenRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Monitor */}
      <group position={[0, 1.2, 0]}>
        {/* Screen bezel */}
        <mesh>
          <boxGeometry args={[2.4, 1.5, 0.08]} />
          <meshStandardMaterial color="#111118" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.045]}>
          <planeGeometry args={[2.1, 1.25]} />
          <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={0.5} />
        </mesh>
        {/* Screen content lines */}
        {[-0.35, -0.15, 0.05, 0.2, 0.35].map((y, i) => (
          <mesh key={i} position={[-0.3 + i * 0.12, y, 0.05]}>
            <planeGeometry args={[0.6 + (i * 0.13), 0.04]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00ffcc" : "#a855f7"}
              emissive={i % 2 === 0 ? "#00ffcc" : "#a855f7"}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Monitor stand */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0.1]}>
        <boxGeometry args={[0.8, 0.04, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Desk surface */}
      <mesh position={[0, -0.02, 0.3]}>
        <boxGeometry args={[3.5, 0.06, 1.6]} />
        <meshStandardMaterial color="#16162a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.05, 0.7]}>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Key rows */}
      {[0, 0.08, 0.16].map((z, row) => (
        Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`${row}-${i}`} position={[-0.45 + i * 0.1, 0.09, 0.55 + z]}>
            <boxGeometry args={[0.07, 0.02, 0.06]} />
            <meshStandardMaterial
              color={row === 1 && i === 4 ? "#00d4aa" : "#2a2a3e"}
              emissive={row === 1 && i === 4 ? "#00d4aa" : "#000000"}
              emissiveIntensity={row === 1 && i === 4 ? 0.5 : 0}
            />
          </mesh>
        ))
      ))}

      {/* Coffee mug */}
      <group position={[1.3, 0.15, 0.6]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.07, 0.15, 16]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.3} roughness={0.6} />
        </mesh>
        {/* Mug handle */}
        <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.3} roughness={0.6} />
        </mesh>
      </group>

      {/* Mouse */}
      <mesh position={[0.85, 0.05, 0.75]}>
        <capsuleGeometry args={[0.03, 0.06, 8, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};

const OrbitingRing = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    ref.current.rotation.x = Math.PI * 0.15;
  });

  return (
    <group ref={ref} position={[0, 0.7, 0]}>
      <mesh>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>
      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 80]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} transparent opacity={0.2} />
      </mesh>
      {/* Orbiting particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1} />
          </mesh>
        );
      })}
    </group>
  );
};

const Particles = () => {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 8;
        const y = (Math.random() - 0.5) * 6;
        const z = (Math.random() - 0.5) * 6;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#00d4aa" : i % 3 === 1 ? "#a855f7" : "#ffffff"}
              emissive={i % 3 === 0 ? "#00d4aa" : i % 3 === 1 ? "#a855f7" : "#ffffff"}
              emissiveIntensity={0.5}
              transparent
              opacity={0.4 + Math.random() * 0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const HeroScene = () => {
  return (
    <div className="w-full h-[600px] md:h-[700px]">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#090916", 5, 12]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, 3, 2]} intensity={0.6} color="#00d4aa" />
        <pointLight position={[3, 2, -2]} intensity={0.4} color="#a855f7" />
        <pointLight position={[0, -1, 3]} intensity={0.2} color="#0088ff" />

        <DeskSetup />
        <OrbitingRing />
        <Particles />

        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5}>
          <FloatingGeo position={[-2.5, 1.8, -1]} color="#00d4aa" speed={0.8} />
        </Float>
        <Float speed={1.2} rotationIntensity={1} floatIntensity={2}>
          <FloatingGeo position={[2.5, 2, -0.5]} color="#a855f7" speed={1.2} />
        </Float>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <FloatingGeo position={[-1.8, -0.5, 1]} color="#0088ff" speed={0.6} />
        </Float>

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[2.8, 0.5, 0.5]}>
            <octahedronGeometry args={[0.3]} />
            <MeshWobbleMaterial color="#00d4aa" factor={0.3} speed={2} metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
