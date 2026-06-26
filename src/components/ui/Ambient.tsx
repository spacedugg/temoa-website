/**
 * Soft colored light blobs that sit behind a section's content so that
 * glassmorphic cards have something to refract. Without this, frosted glass
 * over a plain white background just reads as flat grey. Keep opacities low so
 * the section still reads as white.
 *
 * Parent must be `relative` (and ideally `isolate`).
 */
export function Ambient({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute left-[6%] top-[14%] h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,153,0,0.20), transparent 70%)" }}
      />
      <div
        className="absolute right-[8%] bottom-[10%] h-80 w-80 rounded-full opacity-45 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,49,49,0.13), transparent 70%)" }}
      />
      <div
        className="absolute right-[30%] top-[24%] h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(14,124,160,0.12), transparent 70%)" }}
      />
    </div>
  );
}
