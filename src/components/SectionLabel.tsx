interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

const SectionLabel = ({ number, label, className = "" }: SectionLabelProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {number && (
        <span className="font-mono text-[10px] font-medium tracking-[0.15em] text-white/15 uppercase">
          {number}
        </span>
      )}
      <span className="eyebrow">{label}</span>
    </div>
  );
};

export default SectionLabel;
