import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import { ArrowRight, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Mouse tilt for right panel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 70, filter: "blur(16px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: i * 0.13 },
    }),
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Deep background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] -right-[15%] w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.055) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Ultra-subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-8 items-center min-h-[calc(100vh-9rem)]">

          {/* LEFT — Content */}
          <div className="flex flex-col justify-center gap-7">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="status-pill" role="status">
                <span className="status-dot" aria-hidden="true" />
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name — cinematic word blur reveal */}
            <div aria-label="Kolipakula JanakiRam">
              {["Kolipakula", "JanakiRam"].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-display font-extrabold leading-[0.88] tracking-[-0.045em] text-white block"
                    style={{ fontSize: "clamp(3.8rem, 8.5vw, 7rem)" }}
                  >
                    {i === 1 ? <span className="gradient-text">{word}</span> : word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Accent rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
              className="origin-left w-fit"
            >
              <div className="hr-accent" />
            </motion.div>

            {/* Positioning statement */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.48 }}
            >
              <p className="text-white/50 text-[1.1rem] md:text-xl font-light leading-[1.7] max-w-[420px] text-balance">
                AI-focused engineer building systems that{" "}
                <span className="text-white/85 font-normal">compound in value</span>{" "}
                over time. Product-minded. Startup-driven. Execution-first.
              </p>
            </motion.div>

            {/* Context tags */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
              className="flex flex-wrap gap-2"
            >
              {["CS @ GITAM · Visakhapatnam", "CGPA 8.9 / 10", "2nd Year"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.14em] text-white/28 uppercase border border-white/7 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.68 }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              <MagneticButton as="a" href="#work" className="btn-primary" id="hero-cta-work">
                View My Work <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton as="a" href="#contact" className="btn-ghost" id="hero-cta-contact">
                Let's Talk
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT — Ambient Canvas Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-hidden="true"
            style={{ perspective: "1000px" }}
            className="relative h-[400px] md:h-[480px] lg:h-[520px]"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full"
            >
              {/* Outer glass frame */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border"
                style={{
                  background: "var(--glass-bg-1)",
                  borderColor: "var(--glass-border-2)",
                  backdropFilter: "var(--glass-blur-sm)",
                }}
              >
                <img
                  src="/images/profile.jpeg"
                  alt="Kolipakula JanakiRam"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105 opacity-95 grayscale-[20%]"
                />

                {/* Inner edge highlight */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
                  }}
                />

                {/* Bottom info strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t"
                  style={{
                    background: "rgba(5,5,5,0.7)",
                    borderColor: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="status-dot" />
                      <span className="font-mono text-[9px] tracking-[0.15em] text-[#60A5FA] uppercase">
                        @urstrulyram.k
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {["#60A5FA20", "#ffffff10", "#ffffff08"].map((c, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>

              {/* Glass depth layer 2 (PDF-inspired 3-level) */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, var(--glass-bg-2), transparent 40%)",
                  transform: "translateZ(-6px) scale(1.015)",
                  opacity: 0.5,
                  border: "1px solid var(--glass-border-1)",
                  borderRadius: 16,
                }}
              />

              {/* Glass depth layer 3 (deepest shadow) */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "rgba(96,165,250,0.025)",
                  transform: "translateZ(-14px) scale(1.03)",
                  opacity: 0.4,
                  borderRadius: 18,
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono text-[8px] tracking-[0.25em] text-white/18 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={11} className="text-white/18" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
