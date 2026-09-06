import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { fadeUp } from "@/hooks/useScrollReveal";

interface TechNode {
  id: string;
  name: string;
  category: "ai" | "frontend" | "backend" | "tools";
  x: number;
  y: number;
  projects: string[];
}

interface DomainNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  accent: string;
}

const domains: Record<string, DomainNode> = {
  ai: { id: "ai", label: "AI & ML", x: 230, y: 140, color: "#60A5FA", accent: "rgba(96,165,250,0.15)" },
  frontend: { id: "frontend", label: "Frontend", x: 230, y: 340, color: "#A78BFA", accent: "rgba(167,139,250,0.12)" },
  backend: { id: "backend", label: "Backend", x: 530, y: 140, color: "#34D399", accent: "rgba(52,211,153,0.12)" },
  tools: { id: "tools", label: "Tools / Infra", x: 530, y: 340, color: "#FBBF24", accent: "rgba(251,191,36,0.10)" },
};

const centerNode = { id: "center", label: "RAM K", sublabel: "AI • FULL STACK • SYSTEMS", x: 380, y: 240 };

const techNodes: TechNode[] = [
  // AI & ML
  { id: "python", name: "Python", category: "ai", x: 120, y: 80, projects: ["GOASIGNAL", "RiskWise", "AgentAstra", "AcademeX"] },
  { id: "rag", name: "RAG", category: "ai", x: 90, y: 150, projects: ["GOASIGNAL", "AI Tutor"] },
  { id: "llms", name: "LLMs", category: "ai", x: 150, y: 220, projects: ["AgentAstra", "AI Tutor"] },
  { id: "scikit", name: "Scikit-Learn", category: "ai", x: 270, y: 60, projects: ["RiskWise"] },

  // Frontend
  { id: "react", name: "React", category: "frontend", x: 110, y: 390, projects: ["RiskWise", "AI Tutor", "Sanchari", "Alqua", "Campus Connect", "Assignment Tracker"] },
  { id: "nextjs", name: "Next.js", category: "frontend", x: 90, y: 320, projects: ["GOASIGNAL", "AgentAstra"] },
  { id: "ts", name: "TypeScript", category: "frontend", x: 150, y: 260, projects: ["RiskWise", "Campus Connect", "Assignment Tracker"] },
  { id: "js", name: "JavaScript", category: "frontend", x: 280, y: 420, projects: ["Sanchari", "Dijkstra Visualizer"] },
  { id: "tailwind", name: "Tailwind", category: "frontend", x: 180, y: 430, projects: ["RiskWise", "Portfolio"] },

  // Backend
  { id: "fastapi", name: "FastAPI", category: "backend", x: 640, y: 80, projects: ["GOASIGNAL", "RiskWise", "R&D Proposal", "AgentAstra"] },
  { id: "node", name: "Node.js", category: "backend", x: 670, y: 150, projects: ["Campus Connect", "Assignment Tracker"] },
  { id: "express", name: "Express", category: "backend", x: 610, y: 220, projects: ["Assignment Tracker"] },
  { id: "springboot", name: "Spring Boot", category: "backend", x: 480, y: 60, projects: ["URL Shortener"] },
  { id: "java", name: "Java", category: "backend", x: 710, y: 100, projects: ["URL Shortener"] },
  { id: "sql", name: "SQL", category: "backend", x: 700, y: 210, projects: ["R&D Proposal", "URL Shortener"] },

  // Tools
  { id: "git", name: "Git", category: "tools", x: 640, y: 410, projects: ["All Projects"] },
  { id: "docker", name: "Docker", category: "tools", x: 670, y: 330, projects: ["R&D Proposal", "URL Shortener"] },
  { id: "rest", name: "REST APIs", category: "tools", x: 610, y: 270, projects: ["URL Shortener", "Campus Connect", "RiskWise"] },
  { id: "aws", name: "AWS", category: "tools", x: 480, y: 420, projects: ["Deployment Infrastructure"] },
];

const SVG_W = 760;
const SVG_H = 480;

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredPos, setHoveredPos] = useState<{ x: number, y: number } | null>(null);

  const getTechNode = (id: string) => techNodes.find(t => t.id === id);

  return (
    <section id="skills" className="section-padding" ref={ref} aria-label="Tech Ecosystem section">
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20"
        >
          <div className="flex flex-col gap-4">
            <SectionLabel number="04" label="Technologies" />
            <h2 className="font-display font-bold text-white tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Tech Ecosystem
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-white/35 text-sm max-w-xs leading-relaxed md:text-right text-balance">
              The foundational stack powering my featured work.
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase">
              Hover to see related projects
            </p>
          </div>
        </motion.div>

        {/* SVG Radial Map — Desktop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:block relative"
        >
          <div
            className="relative rounded-2xl overflow-hidden bg-black/20"
            style={{ border: "1px solid rgba(255,255,255,0.07)", minHeight: SVG_H }}
          >
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full" style={{ maxHeight: SVG_H }}>
              
              {/* Lines from Center to Domains */}
              {Object.values(domains).map((domain, i) => (
                <motion.line
                  key={`center-to-${domain.id}`}
                  x1={centerNode.x} y1={centerNode.y}
                  x2={domain.x} y2={domain.y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ strokeDashoffset: 20 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Lines from Domains to Tech Nodes */}
              {techNodes.map((tech, i) => {
                const domain = domains[tech.category];
                const isHovered = hoveredTech === tech.id;
                const isFaded = hoveredTech !== null && hoveredTech !== tech.id;
                
                return (
                  <motion.line
                    key={`line-${tech.id}`}
                    x1={domain.x} y1={domain.y}
                    x2={tech.x} y2={tech.y}
                    stroke={domain.color}
                    strokeWidth={isHovered ? 2 : 1}
                    strokeOpacity={isHovered ? 0.8 : (isFaded ? 0.1 : 0.3)}
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.03 }}
                  />
                );
              })}

              {/* Central Node */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ transformOrigin: `${centerNode.x}px ${centerNode.y}px` }}
              >
                <circle cx={centerNode.x} cy={centerNode.y} r="45" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <circle cx={centerNode.x} cy={centerNode.y} r="38" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x={centerNode.x} y={centerNode.y - 4} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                  {centerNode.label}
                </text>
                <text x={centerNode.x} y={centerNode.y + 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontWeight="500" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                  {centerNode.sublabel}
                </text>
              </motion.g>

              {/* Domain Nodes */}
              {Object.values(domains).map((domain, i) => (
                <motion.g
                  key={domain.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{ transformOrigin: `${domain.x}px ${domain.y}px` }}
                >
                  <circle cx={domain.x} cy={domain.y} r="28" fill={domain.accent} stroke={domain.color} strokeWidth="1.5" strokeOpacity="0.8" />
                  <text x={domain.x} y={domain.y + 3} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                    {domain.label.toUpperCase()}
                  </text>
                </motion.g>
              ))}

              {/* Tech Nodes */}
              {techNodes.map((tech, i) => {
                const domain = domains[tech.category];
                const isHovered = hoveredTech === tech.id;
                const isFaded = hoveredTech !== null && hoveredTech !== tech.id;
                
                return (
                  <motion.g
                    key={tech.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: isFaded ? 0.3 : 1, scale: isHovered ? 1.1 : 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
                    style={{ transformOrigin: `${tech.x}px ${tech.y}px`, cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      setHoveredTech(tech.id);
                      const rect = e.currentTarget.getBoundingClientRect();
                      const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                      if (svgRect) {
                        setHoveredPos({ 
                          x: rect.left - svgRect.left + rect.width / 2, 
                          y: rect.top - svgRect.top - 10 
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredTech(null);
                      setHoveredPos(null);
                    }}
                  >
                    <rect
                      x={tech.x - 35} y={tech.y - 12}
                      width="70" height="24" rx="12"
                      fill={isHovered ? domain.color : "rgba(255,255,255,0.03)"}
                      stroke={domain.color}
                      strokeWidth={isHovered ? 1.5 : 1}
                      strokeOpacity={isHovered ? 1 : 0.4}
                      className="transition-colors duration-300"
                    />
                    <text
                      x={tech.x} y={tech.y + 3}
                      textAnchor="middle"
                      fill={isHovered ? "#000" : "#fff"}
                      fontSize="9"
                      fontWeight={isHovered ? "700" : "500"}
                      fontFamily="Inter, sans-serif"
                      className="transition-colors duration-300"
                      pointerEvents="none"
                    >
                      {tech.name}
                    </text>
                  </motion.g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            <AnimatePresence>
              {hoveredTech && hoveredPos && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-full pb-3"
                  style={{ left: hoveredPos.x, top: hoveredPos.y }}
                >
                  <div className="bg-[#111] border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-xl w-[200px]">
                    <p className="text-white/40 text-[10px] uppercase font-mono tracking-wider mb-2 border-b border-white/5 pb-1">Projects Using {getTechNode(hoveredTech)?.name}</p>
                    <div className="flex flex-col gap-1.5">
                      {getTechNode(hoveredTech)?.projects.map((proj, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: domains[getTechNode(hoveredTech)!.category].color }} />
                          <span className="text-white/90 text-xs font-medium">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Layout — Stacked Domains */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:hidden flex flex-col gap-8"
        >
          {Object.values(domains).map((domain) => (
            <div key={domain.id} className="bg-[#111] rounded-2xl border border-white/5 p-5">
              <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: domain.color, boxShadow: `0 0 10px ${domain.color}` }} />
                <h3 className="font-display font-semibold text-white tracking-wide">{domain.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {techNodes.filter(t => t.category === domain.id).map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => setHoveredTech(hoveredTech === tech.id ? null : tech.id)}
                    className="relative group transition-all duration-300 outline-none"
                  >
                    <div
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${hoveredTech === tech.id ? 'text-black' : 'text-white/80'}`}
                      style={{
                        background: hoveredTech === tech.id ? domain.color : "rgba(255,255,255,0.03)",
                        borderColor: hoveredTech === tech.id ? domain.color : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {tech.name}
                    </div>
                    
                    {/* Inline mobile tooltip below the pill if active */}
                    <AnimatePresence>
                      {hoveredTech === tech.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="relative z-20 min-w-[160px] mt-2 text-left bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5 shadow-xl overflow-hidden"
                        >
                          <span className="block text-[9px] text-white/40 uppercase font-mono tracking-wider mb-1.5">Projects</span>
                          <div className="flex flex-col gap-1.5">
                            {tech.projects.map((proj, idx) => (
                              <span key={idx} className="text-[11px] text-white/90 font-medium flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                {proj}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
