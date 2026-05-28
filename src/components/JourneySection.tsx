import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { fadeUp, fadeUpStagger } from "@/hooks/useScrollReveal";

interface JourneyEntry {
  year: string;
  title: string;
  org: string;
  type: "education" | "achievement" | "milestone" | "ongoing";
  description: string;
  tags?: string[];
}

const entries: JourneyEntry[] = [
  {
    year: "2022",
    title: "SCHOOLING",
    org: "Sri Sathya Sai Vidhya Vihar",
    type: "education",
    description:
      "Completed 10th grade with 84%. Developed early curiosity in mathematics and logical systems — the foundation of computational thinking.",
    tags: ["84%"],
  },
  {
    year: "2024",
    title: "Intermediate — 91%",
    org: "Pandiit Jr. College, Visakhapatnam",
    type: "education",
    description:
      "Achieved 91% in science stream. Strong mathematical foundation accelerated my ability to reason about algorithms, data, and systems.",
    tags: ["91%", "Science"],
  },
  {
    year: "2024",
    title: "B.Tech CSE — Enrolled",
    org: "GITAM University, Visakhapatnam",
    type: "ongoing",
    description:
      "Pursuing Computer Science Engineering with a current CGPA of 8.9. Simultaneously building real products, competing in hackathons, and developing a deep systems engineering perspective.",
    tags: ["CGPA 8.9", "Ongoing"],
  },
];

const typeConfig = {
  education: { dot: "#60A5FA", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.25)" },
  achievement: { dot: "#FBBF24", bg: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.25)" },
  milestone: { dot: "#34D399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
  ongoing: { dot: "#60A5FA", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.2)" },
};

const JourneySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Scroll-linked progress line
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      className="section-padding"
      ref={ref}
      aria-label="Journey section"
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24"
        >
          <div className="flex flex-col gap-4">
            <SectionLabel number="05" label="Journey" />
            <h2
              className="font-display font-bold text-white tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Education
            </h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs leading-relaxed md:text-right text-balance">
            From 10th grade foundations to shipping AI-powered products.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Scroll-driven progress line */}
          <div className="absolute left-[2px] top-2 bottom-2 w-px bg-[rgba(255,255,255,0.06)]">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#60A5FA] to-[#34D399]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-0">
            {entries.map((entry, i) => {
              const cfg = typeConfig[entry.type];
              return (
                <motion.div
                  key={i}
                  variants={fadeUpStagger(i * 0.08)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative flex gap-8 md:gap-12 pb-12 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <div className="relative flex flex-col items-center" style={{ minWidth: 6 }}>
                    <div
                      className="mt-1.5 w-[5px] h-[5px] rounded-full shrink-0 relative z-10"
                      style={{
                        background: cfg.dot,
                        boxShadow: `0 0 8px ${cfg.dot}60`,
                      }}
                    >
                      {entry.type === "ongoing" && (
                        <motion.div
                          className="absolute inset-[-3px] rounded-full"
                          style={{ border: `1px solid ${cfg.dot}40` }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 -mt-0.5">
                    {/* Year */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-mono text-[9px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: cfg.bg,
                          border: `1px solid ${cfg.border}`,
                          color: cfg.dot,
                        }}
                      >
                        {entry.year}
                      </span>
                    </div>

                    {/* Title + org */}
                    <h3 className="font-display font-semibold text-white text-lg tracking-tight mb-0.5">
                      {entry.title}
                    </h3>
                    <p className="eyebrow mb-3">{entry.org}</p>

                    {/* Description */}
                    <p className="text-white/40 text-sm leading-[1.85] max-w-xl mb-3">
                      {entry.description}
                    </p>

                    {/* Tags */}
                    {entry.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[8px] tracking-[0.1em] px-2 py-0.5 rounded-full uppercase"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              color: "rgba(255,255,255,0.35)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
