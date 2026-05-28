import { motion } from "framer-motion";
import { useScrollReveal, fadeUp, fadeUpStagger } from "@/hooks/useScrollReveal";
import SectionLabel from "./SectionLabel";

const education = [
  {
    degree:      "B.Tech in Computer Science",
    institution: "GITAM University",
    location:    "Visakhapatnam",
    period:      "2024 — Present",
    score:       "8.9 CGPA",
    scoreLabel:  "Current CGPA",
    description: "Core focus on algorithms, systems design, and applied software engineering. Active in hackathons, AWS Club DevOps team, and product competitions.",
    status:      "ongoing",
  },
  {
    degree:      "Intermediate — 12th Grade",
    institution: "Pandiit Jr. College",
    location:    "Visakhapatnam",
    period:      "2022 — 2024",
    score:       "91%",
    scoreLabel:  "Percentage",
    description: "Strong foundation in mathematics and sciences, setting the base for computational thinking and engineering problem-solving.",
    status:      "completed",
  },
  {
    degree:      "Secondary Education — 10th",
    institution: "Sri Sathya Sai Vidhya Vihar",
    location:    "Visakhapatnam",
    period:      "2022",
    score:       "84%",
    scoreLabel:  "Percentage",
    description: "Completed secondary education with consistent academic performance and growing interest in technology and computation.",
    status:      "completed",
  },
];

const EducationSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="education"
      className="section-padding"
      ref={ref}
      aria-label="Education section"
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 md:mb-20"
        >
          <div className="flex flex-col gap-4">
            <SectionLabel number="02" label="Education" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
              Academic Foundation
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-xs text-balance leading-relaxed md:text-right">
            Building from first principles — mathematics, logic, and engineering.
          </p>
        </motion.div>

        {/* Education cards — vertical with connecting line */}
        <div className="relative max-w-3xl">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-[#60A5FA]/40 via-[rgba(255,255,255,0.08)] to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                variants={fadeUpStagger(i * 0.1)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative"
              >
                {/* Timeline dot (desktop) */}
                <div className="hidden md:flex absolute left-0 top-7 -translate-x-1/2 z-10 w-3 h-3 rounded-full items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      edu.status === "ongoing"
                        ? "bg-[#60A5FA] shadow-[0_0_10px_rgba(96,165,250,0.6)]"
                        : "bg-[rgba(255,255,255,0.15)]"
                    }`}
                  />
                </div>

                {/* Card */}
                <div className="md:ml-14 card-premium p-6 md:p-8 group hover:border-[rgba(255,255,255,0.1)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <div className="flex flex-col gap-1">
                      <span className="eyebrow">{edu.institution}</span>
                      <h3 className="font-display font-semibold text-lg md:text-xl text-white tracking-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/30 text-xs font-mono">
                          {edu.location}
                        </span>
                        <span className="text-white/15">·</span>
                        <span className="text-white/30 text-xs font-mono">
                          {edu.period}
                        </span>
                      </div>
                    </div>

                    {/* Score badge */}
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span className="text-[10px] font-mono text-white/25 uppercase tracking-wider">
                        {edu.scoreLabel}
                      </span>
                      <span
                        className={`font-display font-bold text-2xl tracking-tight ${
                          edu.status === "ongoing"
                            ? "text-[#60A5FA]"
                            : "text-white/60"
                        }`}
                      >
                        {edu.score}
                      </span>
                    </div>
                  </div>

                  <div className="divider mb-5" />

                  <p className="text-white/40 text-sm leading-relaxed">
                    {edu.description}
                  </p>

                  {edu.status === "ongoing" && (
                    <div className="flex items-center gap-2 mt-4">
                      <span className="status-dot" />
                      <span className="text-[#60A5FA] text-xs font-mono tracking-wider">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
