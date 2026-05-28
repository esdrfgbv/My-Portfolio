import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/hooks/useScrollReveal";
import SectionLabel from "./SectionLabel";

const tabs = ["Mindset", "Approach", "Focus"] as const;
type Tab = typeof tabs[number];

const tabContent: Record<Tab, { heading: string; paragraphs: string[] }> = {
  Mindset: {
    heading: "Systems first. Products always.",
    paragraphs: [
      "I think in systems — how components connect, where they break at scale, and what creates compounding leverage. Most engineers optimize for features. I optimize for architecture.",
      "Every project I build has a clear theory of leverage: what problem does solving this unlock? What does shipping this teach? Engineering is a form of structured thinking, and I treat it that way.",
    ],
  },
  Approach: {
    heading: "Ship fast. Learn real. Iterate sharp.",
    paragraphs: [
      "I approach problems the same way early startups do — with aggressive scope control and an obsession with getting to working software fast. The sooner something is real, the sooner you know what actually matters.",
      "I don't build features for resumes. I build products for users. The gap between a demo and a system people actually use is where most engineers get stuck — I've learned to close it.",
    ],
  },
  Focus: {
    heading: "AI-powered systems and intelligent interfaces.",
    paragraphs: [
      "Right now I'm deep in AI-powered applications: RAG pipelines, semantic retrieval, LLM integration, and building the interface layer between complex models and real users.",
      "I'm particularly drawn to problems where AI creates genuine capability amplification — tools that make builders more capable, systems that make decisions better, interfaces that make complexity invisible.",
    ],
  },
};

const techStack = [
  "Python", "TypeScript", "React", "Node.js", "Spring Boot", "Java", "SQL", "REST APIs", "JavaScript", "Git",
];

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Mindset");
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="section-padding" ref={ref} aria-label="About section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <SectionLabel number="01" label="About" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* LEFT — Identity card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start"
          >
            {/* Large ghost number */}
            <div
              className="font-display font-extrabold text-white/[0.035] select-none leading-none"
              style={{ fontSize: "clamp(7rem, 18vw, 11rem)" }}
              aria-hidden="true"
            >
              01
            </div>

            {/* Glass identity card */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-5"
              style={{
                background: "var(--glass-bg-2)",
                border: "1px solid var(--glass-border-2)",
                backdropFilter: "var(--glass-blur-md)",
              }}
            >
              {/* Name block */}
              <div>
                <h2 className="font-display font-bold text-white text-2xl tracking-tight">Ram.k</h2>
                <p className="font-mono text-[10px] tracking-[0.12em] text-white/30 uppercase mt-1">
                  Kolipakula JanakiRam
                </p>
              </div>

              <div className="divider" />

              {/* Stats grid */}
              <div className="flex flex-col gap-3">
                {[
                  ["University", "GITAM, Visakhapatnam"],
                  ["Degree",     "B.Tech CSE — 2nd Year"],
                  ["CGPA",       "8.9 / 10.0"],
                  ["Focus",      "AI · Systems · Products"],
                  ["Location",   "Visakhapatnam, India"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-start gap-4">
                    <span className="font-mono text-[9px] tracking-[0.12em] text-white/25 uppercase whitespace-nowrap pt-0.5">
                      {label}
                    </span>
                    <span className="text-white/70 text-sm text-right leading-snug">{value}</span>
                  </div>
                ))}
              </div>

              <div className="divider" />

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="font-mono text-[9px] tracking-[0.12em] text-[#60A5FA] uppercase">
                  Open to internships & collabs
                </span>
              </div>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Tabbed narrative */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Tab switcher */}
            <div
              className="flex gap-1 p-1 rounded-xl w-fit"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              role="tablist"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  style={{
                    color: activeTab === tab ? "#f8f8f8" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(96,165,250,0.12)",
                        border: "1px solid rgba(96,165,250,0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="relative min-h-[280px]" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6"
                >
                  <h3
                    className="font-display font-bold text-white tracking-tight"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                  >
                    {tabContent[activeTab].heading}
                  </h3>
                  {tabContent[activeTab].paragraphs.map((p, i) => (
                    <p key={i} className="text-white/50 text-base md:text-[1.05rem] leading-[1.85] font-light text-balance">
                      {p}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* Positioning statement */}
            <blockquote
              className="font-display italic text-white/25 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
            >
              "The best engineers don't just write code — they build systems that outlast their time at the keyboard."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
