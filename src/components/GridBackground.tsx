const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial fade to hide grid edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, hsl(var(--background)) 80%)`,
        }}
      />
      {/* Floating ambient orbs */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[150px] animate-float" />
      <div className="absolute top-[50%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[130px] animate-float-delayed" />
      <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-primary/[0.02] blur-[120px] animate-float" />
    </div>
  );
};

export default GridBackground;
