import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
    {
        degree: "Bachelor of Science in Computer Science",
        institution: "GITAM University Visakhapatnam",
        period: "2024 — Present",
        cgpa: "8.9",
        description: "Currently pursuing B.Tech in Computer Science with focus on software development, algorithms, and system design.",
    },
    {
        degree: "Intermediate (12th)",
        institution: "Pandiit Jr.Clg Visakhapatnam",
        period: "2022 — 2024",
        percentage: "91%",
        description: "Completed intermediate education with strong foundation in mathematics and sciences.",
    },
    {
        degree: "Secondary Education (10th)",
        institution: "Sri Sathya Sai Vidhya Vihar Visakhapatnam",
        period: "2022",
        percentage: "84%",
        description: "Completed secondary education with good academic performance.",
    },
];

const EducationSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="education" className="section-padding" ref={ref}>
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center"
                >
                    <span className="gradient-text">Education</span>
                </motion.h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

                    {education.map((edu, i) => {
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
                                            <GraduationCap size={14} className="text-primary" />
                                            <span className="text-primary font-mono text-xs tracking-wider">{edu.institution}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                                            <Calendar size={12} />
                                            <span>{edu.period}</span>
                                        </div>
                                        {edu.cgpa && (
                                            <p className="text-primary font-semibold text-sm mb-2">CGPA: {edu.cgpa}</p>
                                        )}
                                        {edu.percentage && (
                                            <p className="text-primary font-semibold text-sm mb-2">Percentage: {edu.percentage}</p>
                                        )}
                                        <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
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

export default EducationSection;
