import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  type: "primary" | "secondary" | "accent";
}

interface Edge {
  from: string;
  to: string;
  animated?: boolean;
}

const nodes: Node[] = [
  { id: "user",    x: 50,  y: 260, label: "Client",     sublabel: "Interface",  type: "secondary" },
  { id: "api",     x: 200, y: 155, label: "API",         sublabel: "Gateway",    type: "primary"   },
  { id: "auth",    x: 200, y: 365, label: "Auth",        sublabel: "Service",    type: "secondary" },
  { id: "engine",  x: 370, y: 260, label: "AI",          sublabel: "Engine",     type: "accent"    },
  { id: "db",      x: 530, y: 155, label: "Data",        sublabel: "Layer",      type: "secondary" },
  { id: "vector",  x: 530, y: 365, label: "Vector",      sublabel: "Store",      type: "secondary" },
  { id: "output",  x: 680, y: 260, label: "Response",    sublabel: "Stream",     type: "primary"   },
];

const edges: Edge[] = [
  { from: "user",   to: "api",    animated: true  },
  { from: "user",   to: "auth",   animated: false },
  { from: "api",    to: "engine", animated: true  },
  { from: "auth",   to: "engine", animated: false },
  { from: "engine", to: "db",     animated: true  },
  { from: "engine", to: "vector", animated: true  },
  { from: "db",     to: "output", animated: false },
  { from: "vector", to: "output", animated: true  },
];

const getNode = (id: string) => nodes.find((n) => n.id === id)!;

const NODE_W = 72;
const NODE_H = 40;

const typeConfig = {
  primary:   { bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.45)",  text: "#60A5FA"  },
  accent:    { bg: "rgba(96,165,250,0.18)",  border: "#60A5FA",                text: "#93C5FD"  },
  secondary: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.12)", text: "#9CA3AF"  },
};

const SystemVisual = () => {
  const svgWidth = 740;
  const svgHeight = 500;

  return (
    <div className="w-full h-full flex items-center justify-center select-none" aria-hidden="true">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full"
        style={{ maxHeight: 440 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Animated dash gradient */}
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="accent-glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Clip path for each animated edge */}
          {edges.map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const x1 = from.x + NODE_W / 2;
            const y1 = from.y;
            const x2 = to.x - NODE_W / 2;
            const y2 = to.y;
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            return (
              <motion.path
                key={`clip-${i}`}
                id={`edge-path-${i}`}
                d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke="rgba(96,165,250,0.15)"
                strokeWidth="1"
                strokeDasharray={length}
                initial={{ strokeDashoffset: length }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5 + i * 0.1,
                }}
              />
            );
          })}
        </defs>

        {/* Static base edges */}
        {edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const x1 = from.x + NODE_W / 2;
          const y1 = from.y;
          const x2 = to.x - NODE_W / 2;
          const y2 = to.y;
          return (
            <path
              key={`static-${i}`}
              d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        {/* Animated data-flow packets on accent edges */}
        {edges
          .filter((e) => e.animated)
          .map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const x1 = from.x + NODE_W / 2;
            const y1 = from.y;
            const x2 = to.x - NODE_W / 2;
            const y2 = to.y;

            return (
              <motion.circle
                key={`packet-${i}`}
                r="2.5"
                fill="#60A5FA"
                filter="url(#node-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: 1.2 + i * 0.35,
                  ease: "linear",
                }}
              >
                <animateMotion
                  dur="2.2s"
                  repeatCount="indefinite"
                  begin={`${1.2 + i * 0.35}s`}
                  path={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
                />
              </motion.circle>
            );
          })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const cfg = typeConfig[node.type];
          const x = node.x - NODE_W / 2;
          const y = node.y - NODE_H / 2;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + i * 0.08,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              filter={node.type === "accent" ? "url(#accent-glow)" : undefined}
            >
              {/* Node background */}
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={6}
                fill={cfg.bg}
                stroke={cfg.border}
                strokeWidth={node.type === "accent" ? 1.5 : 1}
              />
              {/* Node label */}
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                fill={cfg.text}
                fontSize="9"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                letterSpacing="0.05em"
              >
                {node.label}
              </text>
              {node.sublabel && (
                <text
                  x={node.x}
                  y={node.y + 9}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.3)"
                  fontSize="7.5"
                  fontFamily="Inter, sans-serif"
                  fontWeight="400"
                  letterSpacing="0.04em"
                >
                  {node.sublabel}
                </text>
              )}
              {/* Pulse ring for accent node */}
              {node.type === "accent" && (
                <motion.rect
                  x={x - 4}
                  y={y - 4}
                  width={NODE_W + 8}
                  height={NODE_H + 8}
                  rx={9}
                  fill="none"
                  stroke="rgba(96,165,250,0.2)"
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}
            </motion.g>
          );
        })}

        {/* Corner label */}
        <text
          x={svgWidth - 10}
          y={svgHeight - 10}
          textAnchor="end"
          fill="rgba(255,255,255,0.08)"
          fontSize="8"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.1em"
        >
          SYSTEM ARCHITECTURE
        </text>
      </svg>
    </div>
  );
};

export default SystemVisual;
