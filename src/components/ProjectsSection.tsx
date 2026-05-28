import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/hooks/useScrollReveal";
import SectionLabel from "./SectionLabel";
import ProjectStack3D from "./ProjectStack3D";

const ProjectsSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="work"
      ref={ref}
      className="section-padding"
      aria-label="Projects section"
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
            <SectionLabel number="03" label="Featured Work" />
            <h2
              className="font-display font-bold text-white tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Products I've Built
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-white/35 text-sm max-w-xs leading-relaxed md:text-right text-balance">
              7 projects spanning AI, fullstack, algorithms, and product engineering.
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase">
              Rotate · Click to Expand
            </p>
          </div>
        </motion.div>

        {/* 3D Stack */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          <ProjectStack3D />
        </motion.div>

        {/* Mobile fallback hint */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center font-mono text-[9px] tracking-[0.12em] text-white/18 uppercase md:hidden"
        >
          Use navigation arrows to browse projects
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;
