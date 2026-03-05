import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const getImg = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const projects = [
  {
    title: "URL Shortener",
    description: "A Spring Boot based URL shortening service that generates compact links, supports expiration-based invalidation, and performs fast redirects using a MySQL database.",
    tech: ["Spring Boot", "Java", "MySQL", "REST API"],
    color: "hsl(210, 80%, 50%)",
    link: "https://urlshortener-9g99.onrender.com",
    image: getImg("url.png"),
  },

  {
    title: "Sanchari",
    description: "Step-by-step interactive coding learning platform with multi-language courses, real code execution, MCQs, progress tracking, and an in-browser code visualizer for clear logic understanding.",
    tech: ["React", "JavaScript", "Code Execution", "Visualization"],
    color: "hsl(175, 80%, 50%)",
    link: "https://sanchariii.vercel.app/",
    image: getImg("sancahri.png"),
  },
  {
    title: "Alqua (SIH 2025)",
    description: "AI-driven platform for marine living resources focused on conserving and managing marine biodiversity. Provides datasets, interactive visualizations, and research tools for marine species and ecosystems.",
    tech: ["React", "Data Visualization", "Research"],
    color: "hsl(200, 70%, 50%)",
    link: "https://alqua-sih-2025.vercel.app/",
    image: getImg("Alqua(sih).png"),
  },
  {
    title: "Campus Connect",
    description: "Smart campus event management and engagement platform designed to streamline how college events are created, approved, discovered, and attended. Connects students, organizers, club leads, and administrators.",
    tech: ["React", "TypeScript", "Node.js", "Event Management"],
    color: "hsl(280, 60%, 60%)",
    link: "https://campus-connect-hub-cyan.vercel.app/",
    image: getImg("campus-connect.png"),
  },
  {
    title: "Assignment Tracker",
    description: "Full-stack assignment management system with role-based dashboards for teachers and students. Features file uploads, real-time status tracking, and grading functionality.",
    tech: ["React", "TypeScript", "Node.js", "Express"],
    color: "hsl(210, 80%, 55%)",
    link: "https://campus-connect-omega-two.vercel.app/",
    image: getImg("assignment tracker.png"),
  },
  {
    title: "Dijkstra Graph Visualizer",
    description: "Interactive visualization tool for Dijkstra's shortest path algorithm. Users can create custom graphs, define start and end nodes, and watch the algorithm execute step-by-step on canvas.",
    tech: ["JavaScript", "Canvas API", "Algorithms", "Visualization"],
    color: "hsl(45, 90%, 55%)",
    link: "https://dijkstra-graph-visualizer.vercel.app/",
    image: getImg("Dijkstra Graph Visualizer.png"),
  },
  {
    title: "AcademeX",
    description: "Python GUI application for academic grading and GPA calculation. Supports absolute and relative grading, calculates GPAs from grades and credits with a scrollable Tkinter interface.",
    tech: ["Python", "Tkinter", "GUI", "Academic Tools"],
    color: "hsl(340, 75%, 55%)",
    link: "https://github.com/esdrfgbv/AcadeMex.git",
    image: getImg("sancahri.png"), // Using sanchari as placeholder since no AcademeX image exists
  },
];

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const prev = () => setActiveIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === projects.length - 1 ? 0 : i + 1));

  const project = projects[activeIndex];

  return (
    <section id="work" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          My <span className="gradient-text">Work</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Project Visual */}
            <div className="relative flex items-center justify-center p-8 lg:p-12 overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 blur-[80px]"
                style={{ backgroundColor: project.color }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full max-w-md"
                >
                  {/* Monitor frame */}
                  <div className="bg-secondary rounded-xl p-3 border border-border">
                    {/* Screen */}
                    <div
                      className="rounded-lg aspect-video flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: `${project.color}15` }}
                    >
                      {/* Project Image */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Project number overlay */}
                      <div
                        className="absolute bottom-2 right-2 text-2xl font-bold bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg"
                        style={{ color: project.color }}
                      >
                        {String(activeIndex + 1).padStart(2, "0")}
                      </div>
                    </div>
                    {/* Monitor base */}
                    <div className="flex justify-center mt-3">
                      <div className="w-12 h-1 rounded-full bg-border" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Project Info */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-primary font-mono text-sm mb-4">
                    Project {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Check Live Site <ExternalLink size={16} />
                  </a>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-lg border border-border flex items-center justify-center hover:border-primary/50 hover:bg-secondary transition-all text-foreground"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-lg border border-border flex items-center justify-center hover:border-primary/50 hover:bg-secondary transition-all text-foreground"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
