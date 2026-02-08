import { Suspense, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const techStack = [
  "Python", "C", "JavaScript", "React",
  "Node.js", "TypeScript", "Tailwind CSS", "Express",
  "SQL", "HTML", "CSS", "Tinkercad",
];

const GlobeScene = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    wireRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    wireRef.current.rotation.x = state.clock.elapsedTime * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d4aa" />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <MeshDistortMaterial color="#0a1628" distort={0.15} speed={2} roughness={0.8} />
      </mesh>
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.35, 20, 20]} />
        <meshBasicMaterial color="#00d4aa" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Dots on globe */}
      {Array.from({ length: 30 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 30);
        const theta = Math.sqrt(30 * Math.PI) * phi;
        const x = 1.32 * Math.cos(theta) * Math.sin(phi);
        const y = 1.32 * Math.sin(theta) * Math.sin(phi);
        const z = 1.32 * Math.cos(phi);
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1} />
          </mesh>
        );
      })}
    </>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 lg:col-span-2 transition-all duration-300"
          >
            <p className="text-primary font-mono text-xs mb-3 tracking-wider">// INTRODUCTION</p>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Passionate about solving real-world problems</h3>
            <p className="text-muted-foreground leading-relaxed">
              Motivated B.Tech CSE undergraduate with strong problem-solving skills and hands-on experience in building
              real-world projects using Python, C, JavaScript, and web technologies. Passionate about system design, logic,
              and scalable solutions, with proven ability to learn fast, adapt, and execute ideas from concept to
              implementation.
            </p>
          </motion.div>

          {/* Globe Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 flex flex-col items-center justify-center transition-all duration-300 min-h-[280px]"
          >
            <p className="text-primary font-mono text-xs mb-2 tracking-wider self-start">// LOCATION</p>
            <div className="w-full h-48">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Loading...</div>}>
                <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
                  <GlobeScene />
                </Canvas>
              </Suspense>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Visakhapatnam, India</p>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 transition-all duration-300"
          >
            <p className="text-primary font-mono text-xs mb-4 tracking-wider">// TECH STACK</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium border border-border hover:border-primary/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-8 flex flex-col justify-between transition-all duration-300 lg:col-span-2"
          >
            <div>
              <p className="text-primary font-mono text-xs mb-3 tracking-wider">// AVAILABILITY</p>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Let's build something together</h3>
              <p className="text-muted-foreground">
                Currently pursuing B.Tech CSE and open to internships, freelance projects, and collaborative opportunities.
                Always excited to work on innovative ideas and challenging problems.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6 w-fit"
            >
              Contact Me →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
