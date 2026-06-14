"use client";

import { motion } from "framer-motion";

const draw = {
  rest: { pathLength: 1, opacity: 1 },
};

type IconName =
  | "margin"
  | "puzzle"
  | "chart"
  | "strategy"
  | "content"
  | "ads"
  | "account"
  | "globe"
  | "target"
  | "spark"
  | "shield"
  | "search"
  | "layers"
  | "rocket";

const paths: Record<IconName, React.ReactNode> = {
  margin: <><path d="M3 21V10M9 21V4M15 21v-7M21 21V8" /><path d="M2 21h20" /></>,
  puzzle: <path d="M9 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z" />,
  chart: <><path d="M4 4v16h16" /><path d="M7 14l3-3 3 3 5-6" /></>,
  strategy: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
  content: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h6M8 17h4" /></>,
  ads: <><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z" /><path d="M16 9a4 4 0 0 1 0 6" /></>,
  account: <><path d="M4 7l8-4 8 4-8 4-8-4Z" /><path d="M4 7v6l8 4 8-4V7" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.5" /></>,
  spark: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z" />,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5Z" /><path d="M3 13l9 5 9-5" /></>,
  rocket: <><path d="M5 15c-1 2-1 4-1 4s2 0 4-1M9 11a8 8 0 0 1 9-8 8 8 0 0 1-8 9l-3 3-2-2 4-2Z" /><circle cx="14" cy="10" r="1.2" /></>,
};

export function Icon({
  name,
  className,
  size = 22,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="rest"
      whileHover={{ scale: 1.08, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <motion.g variants={draw}>{paths[name]}</motion.g>
    </motion.svg>
  );
}
