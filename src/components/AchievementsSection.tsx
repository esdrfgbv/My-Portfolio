import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Calendar, Award } from "lucide-react";

const achievements = [
    {
        title: "SANCHARI – Campus Shark Tank 2.0 (3rd Prize)",
        organization: "GITAM University",
        period: "February 2026",
        description: "Pitched 'SANCHARI', a cognitive training platform for programmers that improves structured thinking and problem-solving under time pressure. Presented the concept, defended the business model, and received strategic feedback from industry judges.",
        badge: "Startup Pitch",
        icon: Trophy,
    },
    {
        title: "Selected for SIH (Smart India Hackathon) Internal Round",
        organization: "Smart India Hackathon 2025",
        period: "October 2025",
        description: "Cleared the internal round in our campus and submitted our presentation for the external round. Developed Alqua, an AI-driven platform for marine living resources.",
        badge: "Competition",
        icon: Trophy,
    },
    {
        title: "AWS Club DevOps Member",
        organization: "GITAM University",
        period: "October 2025 — Present",
        description: "Selected for the AWS Club DevOps team at GITAM University. Working on cloud technologies, DevOps practices, and collaborative projects.",
        badge: "Leadership",
        icon: Award,
    },
    {
        title: "Solved 300+ LeetCode Problems",
        organization: "LeetCode",
        period: "August 2025",
        description: "Solved 300+ LeetCode problems (Easy & Medium) focusing on pattern recognition and problem-solving skills. Strengthened data structures and algorithms knowledge.",
        badge: "Coding",
        icon: Trophy,
    },
];

const AchievementsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="section-padding" ref={ref}>
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center"
                >
                    <span className="gradient-text">Achievements</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, i) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Icon size={20} className="text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-2">
                                            {achievement.badge}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                                    {achievement.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-primary font-mono text-xs tracking-wider">
                                        {achievement.organization}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                                    <Calendar size={12} />
                                    <span>{achievement.period}</span>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {achievement.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
