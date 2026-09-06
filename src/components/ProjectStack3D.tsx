import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Info } from "lucide-react";

const getImg = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  challenge: string;
  impact: string;
  link?: string;
  github?: string;
  details?: string;
  image: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "GOASIGNAL",
    tagline: "Voice-Enabled Sub-200ms Hybrid RAG Engine",
    description: "Production-grade voice-enabled hybrid RAG engine built for Hacker House Goa 2026 Task 2. Combines FAISS dense retrieval, BM25 sparse retrieval, Reciprocal Rank Fusion, ONNX INT8 embeddings, and grounding guardrails.",
    category: "AI · Search",
    tech: ["FastAPI", "Next.js", "FAISS", "Web Speech API"],
    challenge: "Delivering fast, evidence-backed extractive responses with a measured sub-200ms retrieval pipeline.",
    impact: "Built for Hacker House Goa 2026 Task 2",
    link: "https://hh-goa-task-2-alpha.vercel.app/",
    github: "https://github.com/CH-JASWANTH-KUMAR/HH_GOA-TASK-2",
    image: getImg("hhgoa.png"),
    accentColor: "rgba(96,165,250,0.15)",
  },
  {
    id: 2,
    title: "RiskWise",
    tagline: "Merchant Chargeback Risk Manager",
    description: "Predicts chargeback-prone transactions and explains the behavioral evidence behind predictions. Combines a Scikit-Learn ML model with a deterministic Policy Engine and an LLM-powered Evidence Responder.",
    category: "AI · Fintech",
    tech: ["FastAPI", "Python", "Scikit-Learn", "React"],
    challenge: "Integrating a predictive Machine Learning model with strict deterministic policy overrides that cannot be bypassed by the AI.",
    impact: "Built for Razorpay AI Risk Manager Track",
    link: "https://riskwise-six.vercel.app/",
    github: "https://github.com/ramkolipakula/riskwise",
    image: getImg("riskwise.png"),
    accentColor: "rgba(52,211,153,0.15)",
  },
  {
    id: 3,
    title: "R&D Proposal Platform",
    tagline: "AI-powered Evaluation Engine",
    description: "Foundation layer for evaluating R&D proposals. Provides a robust asynchronous API for uploading documents (PDF/DOCX) and triggering processing pipelines using PyMuPDF and PostgreSQL.",
    category: "Backend · API",
    tech: ["FastAPI", "PostgreSQL", "PyMuPDF", "Docker"],
    challenge: "Building a scalable, asynchronous document extraction pipeline designed for future LangChain/LangGraph AI integration.",
    impact: "Smart India Hackathon 2026 — PS 25180",
    link: "https://sih25180.vercel.app/",
    github: "https://github.com/ramkolipakula/sih_2k26",
    image: getImg("sih-2k26.png"),
    accentColor: "rgba(167,139,250,0.15)",
  },
  {
    id: 4,
    title: "AgentAstra",
    tagline: "Multi-Agent AI Startup War Room",
    description: "Real-time startup intelligence platform using FastAPI and Next.js. Features an asynchronous multi-agent pipeline (asyncio + ThreadPoolExecutor) for market sizing, competitor scouting, and risk analysis with dynamic multi-model routing (OpenAI, Anthropic, Groq).",
    category: "AI · Architecture",
    tech: ["FastAPI", "Next.js", "Python", "LLMs"],
    challenge: "Parallelizing specialist LLM agents and streaming live progress via Server-Sent Events (SSE) for a seamless real-time dashboard.",
    impact: "Built a bull/bear debate engine & interactive Shark Tank simulator",
    link: "https://agent-astra-beige.vercel.app/",
    image: getImg("agent-astra.png"),
    accentColor: "rgba(167,139,250,0.15)",
  },
  {
    id: 5,
    title: "AI Tutor",
    tagline: "Interactive AI Learning Platform",
    description: "Browser-based AI-powered learning platform with real-time coding and doubt-solving capabilities. Implemented a Retrieval-Augmented Generation (RAG) pipeline for context-aware doubt solving using document retrieval and AI-generated responses.",
    category: "AI · EdTech",
    tech: ["React", "RAG", "LLM APIs", "Full Stack"],
    challenge: "Designing a modular full-stack architecture that supports scalable educational content delivery alongside real-time AI capabilities.",
    impact: "Automated student progress tracking and intelligent learning workflows",
    link: "https://ai-tutor-beta-black.vercel.app/",
    image: getImg("ai-tutor.png"),
    accentColor: "rgba(52,211,153,0.15)",
  },
  {
    id: 6,
    title: "Sanchari",
    tagline: "Cognitive training platform for programmers",
    description: "Step-by-step coding learning platform with real in-browser code execution, structured MCQ flows, and a visual code tracer. Pitched at Campus Shark Tank 2.0 — won 3rd place against competing startup ideas.",
    category: "EdTech · Product",
    tech: ["React", "JavaScript", "Code Execution", "Visualization"],
    challenge: "Building a zero-latency in-browser code execution engine without server-side sandboxing or paid APIs.",
    impact: "3rd Prize — Campus Shark Tank 2.0, GITAM University",
    link: "https://sanchariii.vercel.app/",
    image: getImg("sancahri.png"),
    accentColor: "rgba(96,165,250,0.15)",
  },
  {
    id: 7,
    title: "Alqua",
    tagline: "AI-driven marine biodiversity platform — SIH 2025",
    description: "Comprehensive platform for marine living resource conservation with AI-integrated species datasets, interactive data visualizations, and research-grade tools for marine biodiversity analysis. Advanced to SIH national round.",
    category: "AI · Research",
    tech: ["React", "Data Visualization", "AI Integration", "Research APIs"],
    challenge: "Aggregating heterogeneous marine research datasets into a unified, semantically navigable interface.",
    impact: "Smart India Hackathon 2025 — Internal Selection",
    link: "https://alqua-sih-2025.vercel.app/",
    image: getImg("Alqua(sih).png"),
    accentColor: "rgba(52,211,153,0.12)",
  },
  {
    id: 8,
    title: "Campus Connect",
    tagline: "Smart event management platform for universities",
    description: "Full-stack platform streamlining how college events are created, approved, discovered, and attended. Connects students, organizers, club leads, and administrators through unified role-based workflows.",
    category: "Platform · Full Stack",
    tech: ["React", "TypeScript", "Node.js", "Event Systems"],
    challenge: "Designing intuitive role-based access that feels seamless across five distinct user archetypes.",
    impact: "Active deployment at GITAM — multi-role event management",
    link: "https://campus-connect-hub-cyan.vercel.app/",
    image: getImg("campus-connect.png"),
    accentColor: "rgba(167,139,250,0.12)",
  },
  {
    id: 9,
    title: "URL Shortener",
    tagline: "Production-grade link management service",
    description: "Spring Boot based URL shortening service with custom short code generation, expiration-based invalidation, analytics tracking, and fast MySQL-backed redirects. Built with production reliability patterns.",
    category: "Backend · Java",
    tech: ["Spring Boot", "Java", "MySQL", "REST API"],
    challenge: "Achieving consistent sub-50ms redirect latency with unique short code generation under concurrent write load.",
    impact: "Deployed on Render — production-grade reliability",
    link: "https://urlshortener-9g99.onrender.com",
    image: getImg("url.png"),
    accentColor: "rgba(251,191,36,0.1)",
  },
  {
    id: 10,
    title: "Assignment Tracker",
    tagline: "Role-based academic management system",
    description: "Full-stack assignment management with role-based dashboards for teachers and students. Features file uploads, real-time status tracking across submission lifecycle, and grading functionality.",
    category: "Full Stack · EdTech",
    tech: ["React", "TypeScript", "Node.js", "Express"],
    challenge: "Keeping complex permission logic invisible to end users while maintaining strict data integrity across roles.",
    impact: "Multi-role system with live file upload and grading flows",
    link: "https://campus-connect-omega-two.vercel.app/",
    image: getImg("assignment tracker.png"),
    accentColor: "rgba(96,165,250,0.1)",
  },
  {
    id: 11,
    title: "Dijkstra Visualizer",
    tagline: "Interactive graph algorithm visualization",
    description: "Canvas-based tool for stepping through Dijkstra's shortest path algorithm. Users build custom weighted graphs, set source and target nodes, then watch the algorithm traverse step-by-step with highlighted paths.",
    category: "Algorithms · Visualization",
    tech: ["JavaScript", "Canvas API", "Graph Algorithms"],
    challenge: "Rendering smooth, correct step-by-step animations on raw HTML5 Canvas without framework overhead.",
    impact: "Used for DSA self-learning — demonstrates systems understanding",
    link: "https://dijkstra-graph-visualizer.vercel.app/",
    image: getImg("Dijkstra Graph Visualizer.png"),
    accentColor: "rgba(251,113,133,0.1)",
  },
  {
    id: 12,
    title: "AcademeX",
    tagline: "Academic GPA calculator with dual grading systems",
    description: "Python desktop application for academic grading and GPA computation. Supports absolute threshold grading and relative curve systems, calculates cumulative GPAs from grades and credits.",
    category: "Desktop · Python",
    tech: ["Python", "Tkinter", "Academic Tools"],
    challenge: "Building a flexible grading engine that correctly handles both absolute and relative curve systems simultaneously.",
    impact: "Solves real GPA calculation complexity for engineering students",
    github: "https://github.com/esdrfgbv/AcadeMex.git",
    image: getImg("sancahri.png"),
    accentColor: "rgba(52,211,153,0.1)",
  },
];

interface DetailPanelProps {
  project: Project;
  onClose: () => void;
}

const DetailPanel = ({ project, onClose }: DetailPanelProps) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          background: "rgba(13,13,13,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-40 md:h-52 overflow-hidden shrink-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(13,13,13,0.97)]" />
          <div className="absolute inset-0" style={{ background: project.accentColor, opacity: 0.15, mixBlendMode: "screen" }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(5,5,5,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-7 flex flex-col gap-5">
          <div>
            <span className="eyebrow block mb-2">{project.category}</span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight mb-1">{project.title}</h3>
            <p className="text-[#60A5FA] text-sm font-medium">{project.tagline}</p>
          </div>

          <p className="text-white/50 text-sm leading-[1.8]">{project.description}</p>

          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="eyebrow block mb-2">Engineering Challenge</span>
            <p className="text-white/45 text-xs leading-relaxed">{project.challenge}</p>
          </div>

          <div>
            <span className="eyebrow block mb-2">Impact</span>
            <p className="text-white/60 text-sm">{project.impact}</p>
          </div>

          <div>
            <span className="eyebrow block mb-2">Stack</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm !py-2.5 !px-5" onClick={e => e.stopPropagation()}>
                View Live <ExternalLink size={13} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm !py-2.5 !px-5" onClick={e => e.stopPropagation()}>
                <Github size={13} /> Source
              </a>
            )}
            {project.details && (
              <a href={project.details} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm !py-2.5 !px-5" onClick={e => e.stopPropagation()}>
                <Info size={13} /> Case Study
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const ProjectStack3D = () => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const isHorizontalRef = useRef<boolean | null>(null);
  const animationFrameRef = useRef<number>();

  // Custom CSS variables style object
  const sliderStyle = { "--quantity": PROJECTS.length } as React.CSSProperties;

  // Handle browser back button for modal
  useEffect(() => {
    const handlePopState = () => {
      setExpandedProject(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProject = (project: Project) => {
    window.history.pushState({ modal: "project" }, "", "");
    setExpandedProject(project);
  };

  const closeProject = () => {
    if (window.history.state?.modal === "project") {
      window.history.back();
    } else {
      setExpandedProject(null);
    }
  };

  // JS-driven continuous rotation and drag handling
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Only update rotation if modal is closed
      if (!expandedProject) {
        if (!isDraggingRef.current) {
          // Apply velocity inertia
          if (Math.abs(velocityRef.current) > 0.05) {
            rotationRef.current += velocityRef.current;
            velocityRef.current *= 0.95; // friction
          } else {
            // Auto run rotation (negative direction to match original CSS)
            rotationRef.current -= (0.015 * delta);
          }
        }

        // Apply transform to the slider ref directly
        if (sliderRef.current) {
          sliderRef.current.style.transform = `perspective(2500px) rotateX(-16deg) rotateY(${rotationRef.current}deg)`;
        }
      } else {
        // Reset lastTime to avoid huge delta jumps when modal closes
        lastTime = performance.now();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [expandedProject]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (expandedProject) return;

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    isHorizontalRef.current = null;

    if (e.target instanceof Element) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Ignore setPointerCapture errors on unmounted/invalid elements
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || expandedProject) return;

    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    // Lock gesture direction after small movement threshold
    if (isHorizontalRef.current === null) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        isHorizontalRef.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalRef.current) {
      // Horizontal swipe
      const moveDelta = e.clientX - lastXRef.current;

      // Map pixels to rotation degrees
      const degDelta = moveDelta * 0.4;

      velocityRef.current = degDelta; // Base velocity for inertia
      rotationRef.current += degDelta;

      // Update immediately to avoid 1 frame lag
      if (sliderRef.current) {
        sliderRef.current.style.transform = `perspective(2500px) rotateX(-16deg) rotateY(${rotationRef.current}deg)`;
      }

      lastXRef.current = e.clientX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    isHorizontalRef.current = null;

    if (e.target instanceof Element) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) { }
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ height: "70vh", minHeight: "560px", touchAction: "pan-y" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        ref={sliderRef}
        className="demo-slider absolute"
        style={{
          width: "250px",
          height: "360px",
          top: "12%",
          ...sliderStyle
        }}
      >
        {PROJECTS.map((project, i) => {
          const itemStyle = { "--position": i + 1 } as React.CSSProperties;

          return (
            <div
              key={project.id}
              className="item group"
              style={itemStyle}
              onClick={() => openProject(project)}
            >
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: project.accentColor,
                  border: "1px solid rgba(255,255,255,0.06)",
                  transform: "translateZ(-8px)",
                  backdropFilter: "blur(4px)",
                }}
              />

              <div
                className="relative w-full h-full rounded-xl overflow-hidden flex flex-col transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(13,13,13,0.92)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="relative h-[160px] md:h-[180px] w-full shrink-0 pointer-events-none">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ WebkitTransform: "translate3d(0,0,0)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(13,13,13,0.95) 100%)",
                    }}
                  />
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                    <span
                      className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(5,5,5,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {project.category.split('·')[0]}
                    </span>
                    <span
                      className="font-display font-bold text-white/40"
                      style={{ fontSize: "1.2rem", lineHeight: 1 }}
                    >
                      {String(project.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-4 pt-2 pointer-events-none">
                  <h3 className="font-display font-bold text-white text-lg tracking-tight mb-0.5 truncate">
                    {project.title}
                  </h3>
                  <p className="text-[#60A5FA] text-xs font-medium leading-tight mb-3">
                    {project.tagline}
                  </p>

                  <p className="text-white/50 text-[11px] leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] px-2 py-1 rounded"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center w-full">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest bg-[#60A5FA] text-black px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {expandedProject && (
        <DetailPanel
          project={expandedProject}
          onClose={closeProject}
        />
      )}
    </div>
  );
};

export default ProjectStack3D;
