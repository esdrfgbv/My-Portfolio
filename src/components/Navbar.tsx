import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#journey" },
  { label: "Milestones", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5"
        aria-label="Primary navigation"
      >
        {/* Pill container */}
        <div
          className={`w-full max-w-3xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${scrolled
              ? "bg-[rgba(13,13,13,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border border-transparent"
            }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="font-display font-bold text-base text-white tracking-tight hover:text-[#60A5FA] transition-colors duration-200"
            aria-label="Ram.k — Home"
          >
            Ram.k
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium text-white/50 hover:text-white/90 transition-colors duration-200 rounded-full hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="btn-ghost text-sm !py-2 !px-4"
              id="nav-cta"
            >
              Let's Talk
              <span className="text-[#60A5FA]">→</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0D0D0D] border-l border-[rgba(255,255,255,0.07)] flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-display font-bold text-white">Ram.k</span>
                <button
                  onClick={closeMobile}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.05 * i,
                    }}
                    className="px-3 py-3 text-lg font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <a
                  href="#contact"
                  onClick={closeMobile}
                  className="btn-primary w-full justify-center"
                  id="mobile-nav-cta"
                >
                  Let's Talk →
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
