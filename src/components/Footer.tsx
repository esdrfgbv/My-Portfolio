import { Github, Linkedin, Twitter, ArrowUp, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <a href="#home" className="text-2xl font-bold gradient-text">{"<Ram.k />"}</a>
            <p className="text-muted-foreground text-sm mt-3 max-w-xs">
              Engineering Undergraduate passionate about building real-world solutions with modern web technologies.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["About", "Education", "Achievements", "Work", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/esdrfgbv" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kolipakula-janakiram-30a520341" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/urstrulyram.k?utm_source=qr" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Ram.k • Learning &gt; Comfort • From ideas → logic → code → impact
          </p>
          <a
            href="#home"
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
