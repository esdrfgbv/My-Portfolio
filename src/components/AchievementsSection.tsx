import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useScrollReveal, fadeUp, fadeUpStagger } from "@/hooks/useScrollReveal";
import SectionLabel from "./SectionLabel";

interface Milestone {
  period: string;
  category: string;
  title: string;
  organization: string;
  description: string;
  highlight?: string;
  link?: string;
}

const milestones: Milestone[] = [
  {
    period: "March 2026",
    category: "Hackathon",
    title: "IdeaSprint 3.0 — 1st Place",
    organization: "TMGC Group, GITAM University",
    description: "Won 1st place among 80+ participating teams in the IdeaSprint 3.0 Hackathon. Demonstrated strong problem-solving and rapid prototyping capabilities under a tight deadline.",
    highlight: "1st Place",
  },
  {
    period: "February 2026",
    category: "Startup Pitch",
    title: "Campus Shark Tank 2.0 — 3rd Prize",
    organization: "GITAM University",
    description: "Presented Sanchari — a cognitive training platform for programmers — to a panel of industry judges. Defended product vision, business model, and technical architecture under competitive conditions.",
    highlight: "3rd Prize",
  },
  {
    period: "October 2025",
    category: "National Hackathon",
    title: "Smart India Hackathon 2025 — Internal Selection",
    organization: "SIH 2025",
    description: "Cleared the internal round at GITAM and submitted Alqua — an AI-driven marine biodiversity platform — for the external round. Selected from a competitive field across the university.",
    highlight: "Selected",
  },
  {
    period: "August 2025",
    category: "Coding",
    title: "300+ LeetCode Problems Solved",
    organization: "LeetCode",
    description: "Solved 300+ problems (Easy & Medium) with intentional focus on pattern recognition over brute force. Strengthened data structures knowledge across trees, graphs, dynamic programming, and sliding window techniques.",
    highlight: "300+",
    link: "https://leetcode.com/u/Ram___k/",
  },
  {
    period: "January 2024",
    category: "Education",
    title: "Secured 96 percentile in JEE MAINS",
    organization: "NTA",
    description: "with an intense preparation of 2 years for JEE MAINS secured 96 percentile with an ALL INDIA RANK of 75K.",
    highlight: "AIR 75k",
  },
];

const categoryColors: Record<string, string> = {
  "Work Experience": "text-[#34D399] bg-[rgba(52,211,153,0.1)] border-[rgba(52,211,153,0.2)]",
  "Startup Pitch": "text-[#60A5FA] bg-[rgba(96,165,250,0.1)] border-[rgba(96,165,250,0.2)]",
  "Hackathon": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "National Hackathon": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Leadership": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "Coding": "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const AchievementsSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="achievements"
      className="section-padding"
      ref={ref}
      aria-label="Milestones section"
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
            <SectionLabel number="04" label="Milestones" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
              Proof of Capability
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-xs leading-relaxed md:text-right text-balance">
            Real achievements — no inflated metrics, no vanity numbers.
          </p>
        </motion.div>

        {/* Milestones — vertical timeline */}
        <div className="relative max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#60A5FA]/30 via-[rgba(255,255,255,0.06)] to-transparent hidden md:block" />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
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
                    className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.2)] group-hover:bg-[#60A5FA] group-hover:border-[rgba(96,165,250,0.5)] group-hover:shadow-[0_0_10px_rgba(96,165,250,0.4)] transition-all duration-300"
                  />
                </div>

                {/* Content */}
                <div className="md:ml-8 flex-1">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/25 uppercase">
                      {m.period}
                    </span>
                    <span className="text-white/10">·</span>
                    <span
                      className={`font-mono text-[9px] tracking-[0.1em] uppercase font-semibold px-2 py-0.5 rounded-full border ${categoryColors[m.category] || "text-white/40 bg-white/5 border-white/10"}`}
                    >
                      {m.category}
                    </span>
                    {m.highlight && (
                      <>
                        <span className="text-white/10">·</span>
                        <span className="font-display font-bold text-sm text-[#60A5FA]">
                          {m.highlight}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  {m.link ? (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#60A5FA] transition-colors group/link"
                    >
                      <h3 className="font-display font-semibold text-lg md:text-xl text-white group-hover/link:text-[#60A5FA] tracking-tight mb-1 transition-colors">
                        {m.title}
                      </h3>
                      <ExternalLink size={30} className="text-white/40 group-hover/link:text-[#60A5FA] mb-1 transition-colors" />
                    </a>
                  ) : (
                    <h3 className="font-display font-semibold text-lg md:text-xl text-white tracking-tight mb-1">
                      {m.title}
                    </h3>
                  )}

                  {/* Org */}
                  <p className="eyebrow mb-4">{m.organization}</p>

                  {/* Description */}
                  <p className="text-white/40 text-sm leading-[1.8] max-w-2xl">
                    {m.description}
                  </p>

                  {/* Divider below (not on last) */}
                  {i < milestones.length - 1 && (
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

export default AchievementsSection;
