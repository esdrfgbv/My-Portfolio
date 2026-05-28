const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[rgba(255,255,255,0.06)] px-6 md:px-12 lg:px-20 py-8"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="font-display font-bold text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            Ram.k
          </a>
          <span className="text-white/15">·</span>
          <span className="font-mono text-[10px] text-white/20 tracking-wider">
            © {year}
          </span>
        </div>

        {/* Right */}
        <p className="font-mono text-[10px] text-white/20 tracking-wider text-center sm:text-right">
          Designed & built by Kolipakula JanakiRam
        </p>
      </div>
    </footer>
  );
};

export default Footer;
