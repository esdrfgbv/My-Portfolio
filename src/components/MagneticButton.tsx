import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  strength?: number;
  as?: "button" | "a";
}

const MagneticButton = ({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  id,
  strength = 0.3,
  as: Tag = href ? "a" : "button",
}: MagneticButtonProps) => {
  const { ref, onMouseMove, onMouseLeave } = useMagneticEffect({ strength, radius: 90 });

  const commonProps = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    id,
    className,
    onMouseMove,
    onMouseLeave,
    onClick,
  };

  if (Tag === "a" && href) {
    return (
      <a {...commonProps} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps}>
      {children}
    </button>
  );
};

export default MagneticButton;
