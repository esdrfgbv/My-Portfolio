import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "B.Tech Computer Science & Engineering",
    company: "GITAM University Visakhapatnam",
    period: "2024 — Present",
    description: "Currently pursuing Bachelor of Technology in Computer Science with a CGPA of 8.9. Active member of AWS Club DevOps team. Building real-world projects and solving 300+ LeetCode problems.",
    tech: ["Python", "C", "JavaScript", "React"],
  },
  {
    title: "Smart India Hackathon - Internal Round",
    company: "SIH 2025",
    period: "October 2025",
    description: "Selected for Smart India Hackathon internal round. Developed Alqua, an AI-driven platform for marine living resources focused on conserving and managing marine biodiversity with integrated datasets and research tools.",
    tech: ["React", "AI/ML", "Data Visualization", "Research"],
  },
  {
    title: "AWS Club DevOps Member",
    company: "GITAM University",
    period: "October 2025 — Present",
    description: "Selected for the AWS Club DevOps team at GITAM University. Working on cloud technologies, DevOps practices, and collaborative projects with fellow students.",
    tech: ["AWS", "DevOps", "Cloud Computing", "CI/CD"],
  },
  {
    title: "Intermediate Education",
    company: "Pandiit Jr.Clg Visakhapatnam",
    period: "2022 — 2024",
    description: "Completed intermediate education with 91% marks. Built strong foundation in mathematics and sciences, which sparked interest in computer science and problem-solving.",
    tech: ["Mathematics", "Physics", "Chemistry"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          Work <span className="gradient-text">Experience & Education</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={`relative flex items-start mb-12 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />
                </div>

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 ${isLeft ? "md:mr-auto md:pr-12 md:w-[45%]" : "md:ml-auto md:pl-12 md:w-[45%]"
                    }`}
                >
                  <div className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase size={14} className="text-primary" />
                      <span className="text-primary font-mono text-xs tracking-wider">{exp.company}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs border border-border group-hover:border-primary/20 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
