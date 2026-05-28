import { useRef, useCallback } from "react";

interface MagneticConfig {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect({ strength = 0.35, radius = 80 }: MagneticConfig = {}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength;
        const moveX = distX * factor;
        const moveY = distY * factor;

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(() => {
          if (el) {
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            el.style.transition = "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)";
          }
        });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
