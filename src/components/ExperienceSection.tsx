import { motion } from "framer-motion";
import { useScrollReveal, fadeUp, fadeUpStagger } from "@/hooks/useScrollReveal";
import SectionLabel from "./SectionLabel";

interface Experience {
  period:       string;
  category:     string;
  title:        string;
  organization: string;
  description:  string;
  highlight?:   string;
}

const experiences: Experience[] = [
  {
    period:       "May 2026 — Present",
    category:     "Work Experience",
    title:        "Full Stack Developer + Automations Engineer",
    organization: "Koutuhal.ai",
    description:  "Working on the AI Tutor internship platform, building scalable full-stack features involving authentication, APIs, and dashboards. Developing automations to streamline internal operations and data handling.",
    highlight:    "Active",
  },
  {
    period:       "October 2025 — Present",
    category:     "Leadership",
    title:        "AWS Club DevOps Member",
    organization: "GITAM University",
    description:  "Selected for the AWS Club DevOps team. Working on cloud infrastructure, CI/CD practices, and collaborative engineering projects alongside peers in a structured, industry-aligned environment.",
    highlight:    "Active",
  }
];

const categoryColors: Record<string, string> = {
  "Work Experience":    "text-[#34D399] bg-[rgba(52,211,153,0.1)] border-[rgba(52,211,153,0.2)]",
  "Leadership":         "text-[#60A5FA] bg-[rgba(96,165,250,0.1)] border-[rgba(96,165,250,0.2)]",
};

const ExperienceSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="experience"
      className="section-padding"
      ref={ref}
      aria-label="Experience section"
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div className="flex flex-col gap-4">
            <SectionLabel number="04" label="Experience" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
              Professional Roles
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-xs leading-relaxed md:text-right text-balance">
            Internships, leadership roles, and hands-on operational experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#34D399]/30 via-[rgba(255,255,255,0.06)] to-transparent hidden md:block" />

          <div className="flex flex-col gap-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUpStagger(i * 0.1)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative flex gap-8 md:gap-12 pb-10 last:pb-0 group"
              >
                {/* Timeline dot (desktop) */}
                <div className="hidden md:flex absolute left-0 top-1.5 -translate-x-1/2 z-10">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.2)] group-hover:bg-[#34D399] group-hover:border-[rgba(52,211,153,0.5)] group-hover:shadow-[0_0_10px_rgba(52,211,153,0.4)] transition-all duration-300"
                  />
                </div>

                {/* Content */}
                <div className="md:ml-8 flex-1">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/25 uppercase">
                      {exp.period}
                    </span>
                    <span className="text-white/10">·</span>
                    <span
                      className={`font-mono text-[9px] tracking-[0.1em] uppercase font-semibold px-2 py-0.5 rounded-full border ${categoryColors[exp.category] || "text-white/40 bg-white/5 border-white/10"}`}
                    >
                      {exp.category}
                    </span>
                    {exp.highlight && (
                      <>
                        <span className="text-white/10">·</span>
                        <span className="font-display font-bold text-sm text-[#34D399]">
                          {exp.highlight}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-lg md:text-xl text-white tracking-tight mb-1">
                    {exp.title}
                  </h3>

                  {/* Org */}
                  <p className="eyebrow mb-4">{exp.organization}</p>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-[1.8] max-w-2xl">
                    {exp.description}
                  </p>

                  {/* Divider below (not on last) */}
                  {i < experiences.length - 1 && (
                    <div className="divider mt-10 opacity-50" />
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

export default ExperienceSection;
