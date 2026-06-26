import type { IconName } from "../ui/Icon";

/* Deterministic, unified article cover built from the category accent.
   No external assets, no style break. */

const ICON_PATHS: Partial<Record<IconName, React.ReactNode>> = {
  ads: <><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z" /><path d="M16 9a4 4 0 0 1 0 6" /></>,
  content: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h6M8 17h4" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5Z" /><path d="M3 13l9 5 9-5" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>,
  strategy: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
  account: <><path d="M4 7l8-4 8 4-8 4-8-4Z" /><path d="M4 7v6l8 4 8-4V7" /></>,
  spark: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.5" /></>,
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
  return h;
}

export function BlogCover({
  accent,
  icon,
  seed,
  label,
  className,
}: {
  accent: string;
  icon: IconName;
  seed: string;
  label?: string;
  className?: string;
}) {
  const h = hash(seed);
  const arcRotation = h % 360;
  const dx = (h % 5) - 2; // -2..2

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: `linear-gradient(135deg, ${accent} 0%, #0A1E2B 115%)` }}
    >
      {/* dotted texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* soft light blob, position varies by seed */}
      <div
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-white/20 blur-2xl"
        style={{ top: `${10 + (h % 30)}%`, left: `${(h % 40)}%` }}
      />
      {/* concentric arcs motif */}
      <svg
        className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-white/15"
        viewBox="0 0 100 100"
        fill="none"
        style={{ transform: `rotate(${arcRotation}deg)` }}
      >
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* category icon */}
      <svg
        className="absolute bottom-4 right-5 h-12 w-12 text-white/85"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: `translateX(${dx}px)` }}
      >
        {ICON_PATHS[icon] ?? ICON_PATHS.strategy}
      </svg>
      {label && (
        <span className="absolute left-5 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
