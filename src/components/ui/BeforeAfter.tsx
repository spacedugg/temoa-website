"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Drag-/Hover-Slider zum Vergleich Vorher (links) vs. Nachher (rechts). */
export function BeforeAfter({
  before,
  after,
  className,
  labelBefore = "Vorher",
  labelAfter = "Nachher",
}: {
  before: string;
  after: string;
  className?: string;
  labelBefore?: string;
  labelAfter?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  function setFromClientX(clientX: number) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label={`Vorher-Nachher-Vergleich: ${labelBefore} gegen ${labelAfter}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
      className={`relative aspect-square w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-navy/[0.07] bg-white shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${className ?? ""}`}
      onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* after layer (full) */}
      <Image src={after} alt={labelAfter} fill sizes="(max-width:1024px) 100vw, 600px" className="object-contain p-4" priority={false} />
      <span className="absolute right-4 top-4 z-20 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white shadow-soft">
        {labelAfter} · TEMOA
      </span>

      {/* before layer (clipped via clip-path) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={labelBefore} fill sizes="(max-width:1024px) 100vw, 600px" className="bg-white object-contain p-4" />
        <span className="absolute left-4 top-4 z-20 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white shadow-soft">
          {labelBefore}
        </span>
      </div>

      {/* handle */}
      <div className="absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(2,48,71,0.15)]" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lift">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A1E2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
