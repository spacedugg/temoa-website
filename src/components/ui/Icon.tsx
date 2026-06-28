"use client";

import { motion, type Variants } from "framer-motion";

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

export type { IconName };

/* The stroke of every icon draws itself in when it scrolls into view, then a
   hover gives it a little spring. No coloured plates behind the glyphs. */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const stroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
      opacity: { duration: 0.2 },
    },
  },
};

/* motion-enabled primitives so each sub-shape animates on its own */
const P = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path variants={stroke} {...props} />
);
const C = (props: React.ComponentProps<typeof motion.circle>) => (
  <motion.circle variants={stroke} {...props} />
);
const R = (props: React.ComponentProps<typeof motion.rect>) => (
  <motion.rect variants={stroke} {...props} />
);

const paths: Record<IconName, React.ReactNode> = {
  margin: <><P d="M3 21V10M9 21V4M15 21v-7M21 21V8" /><P d="M2 21h20" /></>,
  puzzle: <P d="M9 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H6a1 1 0 0 1-1-1v-3H4a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z" />,
  chart: <><P d="M4 4v16h16" /><P d="M7 14l3-3 3 3 5-6" /></>,
  strategy: <><C cx="12" cy="12" r="3" /><P d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
  content: <><R x="4" y="4" width="16" height="16" rx="2" /><P d="M8 9h8M8 13h6M8 17h4" /></>,
  ads: <><P d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z" /><P d="M16 9a4 4 0 0 1 0 6" /></>,
  account: <><P d="M4 7l8-4 8 4-8 4-8-4Z" /><P d="M4 7v6l8 4 8-4V7" /></>,
  globe: <><C cx="12" cy="12" r="9" /><P d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>,
  target: <><C cx="12" cy="12" r="8" /><C cx="12" cy="12" r="4" /><C cx="12" cy="12" r="0.5" /></>,
  spark: <P d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z" />,
  shield: <><P d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><P d="M9 12l2 2 4-4" /></>,
  search: <><C cx="11" cy="11" r="6" /><P d="M20 20l-4.5-4.5" /></>,
  layers: <><P d="M12 3l9 5-9 5-9-5 9-5Z" /><P d="M3 13l9 5 9-5" /></>,
  rocket: <><P d="M5 15c-1 2-1 4-1 4s2 0 4-1M9 11a8 8 0 0 1 9-8 8 8 0 0 1-8 9l-3 3-2-2 4-2Z" /><C cx="14" cy="10" r="1.2" /></>,
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
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      whileHover={{ scale: 1.12, rotate: 3 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
    >
      {paths[name]}
    </motion.svg>
  );
}
