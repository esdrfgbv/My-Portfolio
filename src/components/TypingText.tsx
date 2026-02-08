import { useState, useEffect } from "react";

const roles = [
  "Full-Stack Developer",
  "3D Web Engineer",
  "Creative Technologist",
  "UI/UX Enthusiast",
];

const useTypingEffect = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);

        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);

        if (charIndex <= 1) {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return displayText;
};

const TypingText = () => {
  const text = useTypingEffect();

  return (
    <span className="text-primary font-mono">
      {text}
      <span className="animate-glow-pulse text-primary">|</span>
    </span>
  );
};

export default TypingText;
