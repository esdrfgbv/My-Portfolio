import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/hooks/useScrollReveal";
import MagneticButton from "./MagneticButton";
import SectionLabel from "./SectionLabel";
import { Github, Linkedin, Mail, ArrowUpRight, Instagram } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/esdrfgbv",
    icon: Github,
    handle: "@esdrfgbv",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kolipakula-janaki-ram-a33820292",
    icon: Linkedin,
    handle: "Kolipakula JanakiRam",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/urstrulyram.k/",
    icon: Instagram,
    handle: "@urstrulyram.k",
  }
];

const ContactSection = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="contact"
      className="section-padding"
      ref={ref}
      aria-label="Contact section"
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <SectionLabel number="05" label="Contact" />
        </motion.div>

        {/* Main contact block */}
        <div className="max-w-3xl">
          {/* Large CTA heading */}
          <div className="overflow-hidden mb-8">
            {["Let's Build", "Something Real."].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
              >
                <h2
                  className={`font-display font-bold tracking-tight leading-[1.0] ${i === 1 ? "gradient-text" : "text-white"
                    }`}
                  style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
                >
                  {line}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-white/45 text-lg leading-relaxed mb-12 text-balance"
          >
            Open to internships, startup collaborations, freelance projects, and research
            opportunities. If you're building something meaningful — let's talk.
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="mb-12"
          >
            <MagneticButton
              as="a"
              href="mailto:subrahmanyamkolipakula@gmail.com"
              className="group flex items-center gap-3 w-fit"
              id="contact-email-link"
            >
              <div className="flex items-center gap-3 border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-4 bg-[rgba(255,255,255,0.02)] hover:border-[rgba(96,165,250,0.35)] hover:bg-[rgba(96,165,250,0.04)] transition-all duration-300">
                <Mail size={18} className="text-[#60A5FA] shrink-0" />
                <span className="font-mono text-sm md:text-base text-white/70 group-hover:text-white transition-colors duration-200">
                  subrahmanyamkolipakula@gmail.com
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-white/20 group-hover:text-[#60A5FA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                />
              </div>
            </MagneticButton>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="divider mb-10 origin-left"
          />

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <span className="text-white/25 text-xs font-mono uppercase tracking-wider">
              Find me on
            </span>
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(96,165,250,0.25)] hover:bg-[rgba(96,165,250,0.05)] transition-all duration-200"
                >
                  <Icon size={15} className="text-white/40 group-hover:text-[#60A5FA] transition-colors duration-200" />
                  <span className="text-white/50 group-hover:text-white/80 text-xs font-medium transition-colors duration-200 hidden sm:block">
                    {handle}
                  </span>
                  <span className="text-white/50 group-hover:text-white/80 text-xs font-medium transition-colors duration-200 sm:hidden">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Availability indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex items-center gap-2 mt-12"
          >
            <span className="status-dot" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-white/25 uppercase">
              Currently available for new opportunities
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
