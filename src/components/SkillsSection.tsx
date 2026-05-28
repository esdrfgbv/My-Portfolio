import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { fadeUp, fadeUpStagger } from "@/hooks/useScrollReveal";

interface TechNode {
  name: string;
  category: "ai" | "frontend" | "backend" | "tools";
  level: 1 | 2 | 3; // 1=core, 2=proficient, 3=familiar
}

const techNodes: TechNode[] = [
  // AI/ML
  { name: "Python",      category: "ai",       level: 1 },
  { name: "RAG Systems", category: "ai",       level: 2 },
  { name: "AI APIs",     category: "ai",       level: 2 },
  // Frontend
  { name: "React",       category: "frontend", level: 1 },
  { name: "TypeScript",  category: "frontend", level: 1 },
  { name: "JavaScript",  category: "frontend", level: 1 },
  { name: "Tailwind",    category: "frontend", level: 2 },
  // Backend
  { name: "Node.js",     category: "backend",  level: 1 },
  { name: "Express",     category: "backend",  level: 2 },
  { name: "Spring Boot", category: "backend",  level: 2 },
  { name: "Java",        category: "backend",  level: 2 },
  { name: "SQL",         category: "backend",  level: 2 },
  // Tools
  { name: "Git",         category: "tools",    level: 1 },
  { name: "REST APIs",   category: "tools",    level: 1 },
  { name: "C",           category: "tools",    level: 2 },
  { name: "AWS",         category: "tools",    level: 3 },
];

const categoryConfig = {
  ai:       { label: "AI & ML",     color: "#60A5FA", accent: "rgba(96,165,250,0.15)"   },
  frontend: { label: "Frontend",    color: "#A78BFA", accent: "rgba(167,139,250,0.12)"  },
  backend:  { label: "Backend",     color: "#34D399", accent: "rgba(52,211,153,0.12)"   },
  tools:    { label: "Tools",       color: "#FBBF24", accent: "rgba(251,191,36,0.10)"   },
};

const levelSize: Record<number, { w: number; h: number; textSize: string }> = {
  1: { w: 88,  h: 36, textSize: "0.75rem"  },
  2: { w: 78,  h: 32, textSize: "0.6875rem"},
  3: { w: 70,  h: 28, textSize: "0.625rem" },
};

// Layout positions — 4 columns, 1 per category
const columnX: Record<string, number> = {
  ai:       100,
  frontend: 280,
  backend:  460,
  tools:    640,
};

const SVG_W = 760;
const SVG_H = 480;

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Build y positions per column
  const columnNodes: Record<string, TechNode[]> = { ai: [], frontend: [], backend: [], tools: [] };
  for (const n of techNodes) columnNodes[n.category].push(n);

  const getNodeCenter = (node: TechNode, indexInCol: number) => {
    const col = columnX[node.category];
    const colNodes = columnNodes[node.category];
    const totalH = colNodes.length * 58;
    const startY = (SVG_H - totalH) / 2 + 30;
    return { x: col, y: startY + indexInCol * 58 };
  };

  // Build connection pairs between related nodes
  const connections: Array<[TechNode, TechNode]> = [
    [techNodes[0], techNodes[7]], // Python ↔ Node.js
    [techNodes[1], techNodes[2]], // RAG ↔ AI APIs
    [techNodes[3], techNodes[7]], // React ↔ Node.js
    [techNodes[4], techNodes[7]], // TypeScript ↔ Node.js
    [techNodes[7], techNodes[11]], // Node.js ↔ SQL
    [techNodes[9], techNodes[11]], // Spring Boot ↔ SQL
    [techNodes[3], techNodes[6]], // React ↔ Tailwind
    [techNodes[12], techNodes[13]], // Git ↔ REST APIs
    [techNodes[7], techNodes[13]], // Node.js ↔ REST APIs
    [techNodes[1], techNodes[7]], // RAG ↔ Node.js
  ];

  return (
    <section
      id="skills"
      className="section-padding"
      ref={ref}
      aria-label="Skills section"
    >
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
            <h2
              className="font-display font-bold text-white tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Tech Ecosystem
            </h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(categoryConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span className="font-mono text-[9px] tracking-[0.12em] text-white/35 uppercase">{cfg.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SVG Constellation — desktop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:block"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full"
              style={{ maxHeight: 480 }}
              aria-hidden="true"
            >
              {/* Connection lines */}
              {connections.map(([a, b], i) => {
                const aIdx = columnNodes[a.category].indexOf(a);
                const bIdx = columnNodes[b.category].indexOf(b);
                const ac = getNodeCenter(a, aIdx);
                const bc = getNodeCenter(b, bIdx);
                const catA = categoryConfig[a.category];
                return (
                  <motion.line
                    key={i}
                    x1={ac.x} y1={ac.y}
                    x2={bc.x} y2={bc.y}
                    stroke={catA.color}
                    strokeWidth="0.7"
                    strokeOpacity="0"
                    animate={isInView ? { strokeOpacity: 0.18 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
                  />
                );
              })}

              {/* Nodes */}
              {techNodes.map((node) => {
                const colIndex = columnNodes[node.category].indexOf(node);
                const center = getNodeCenter(node, colIndex);
                const cfg = categoryConfig[node.category];
                const sz = levelSize[node.level];

                return (
                  <motion.g
                    key={node.name}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.15 + colIndex * 0.08 + (Object.keys(categoryConfig).indexOf(node.category)) * 0.04,
                    }}
                    style={{ transformOrigin: `${center.x}px ${center.y}px` }}
                  >
                    {/* Node background */}
                    <rect
                      x={center.x - sz.w / 2}
                      y={center.y - sz.h / 2}
                      width={sz.w}
                      height={sz.h}
                      rx={sz.h / 2}
                      fill={cfg.accent}
                      stroke={cfg.color}
                      strokeWidth={node.level === 1 ? 1.2 : 0.7}
                      strokeOpacity={node.level === 1 ? 0.6 : 0.3}
                    />
                    {/* Node label */}
                    <text
                      x={center.x}
                      y={center.y + 0.5}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={cfg.color}
                      fontSize={sz.textSize}
                      fontFamily="Inter, sans-serif"
                      fontWeight={node.level === 1 ? "600" : "400"}
                      fillOpacity={node.level === 1 ? 0.9 : 0.65}
                    >
                      {node.name}
                    </text>
                  </motion.g>
                );
              })}

              {/* Column headers */}
              {Object.entries(categoryConfig).map(([key, cfg]) => (
                <text
                  key={key}
                  x={columnX[key]}
                  y={22}
                  textAnchor="middle"
                  fill={cfg.color}
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                  letterSpacing="0.1em"
                  fillOpacity="0.45"
                  textDecoration="none"
                >
                  {cfg.label.toUpperCase()}
                </text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Mobile fallback — grouped pill list */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:hidden flex flex-col gap-6"
        >
          {Object.entries(categoryConfig).map(([key, cfg]) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span className="eyebrow">{cfg.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {columnNodes[key as keyof typeof columnNodes].map((node) => (
                  <span
                    key={node.name}
                    className="tech-pill"
                    style={{
                      borderColor: `${cfg.color}30`,
                      color: node.level === 1 ? cfg.color : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {node.name}
                  </span>
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
