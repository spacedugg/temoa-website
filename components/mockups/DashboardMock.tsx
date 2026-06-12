export function DashboardMock({ className = "", square = false }: { className?: string; square?: boolean }) {
  return (
    <div
      className={`w-[320px] bg-white p-5 ring-1 ring-[#e3e9ee] sm:w-[420px] ${square ? "" : "rounded-2xl"} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/assets/logos/logo_icon.svg" alt="" className="h-5 w-auto" />
          <span className="text-[12px] font-bold tracking-wide text-[#023047]">
            Performance-Report
          </span>
        </div>
        <span className="rounded-md bg-[#f5f7f9] px-2 py-0.5 text-[10px] font-bold text-[#41586a]">
          Letzte 12 Monate
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Organischer Anteil", value: "80 %", accent: "#ff8a00" },
          { label: "ROAS", value: "4,8", accent: "#023047" },
          { label: "TACoS", value: "−35 %", accent: "#ff3131" },
        ].map((kpi) => (
          <div key={kpi.label} className={`bg-[#f5f7f9] p-2.5 ${square ? "" : "rounded-xl"}`}>
            <p className="text-[9px] font-bold uppercase tracking-wide text-[#41586a]">
              {kpi.label}
            </p>
            <p className="mt-0.5 text-lg font-extrabold" style={{ color: kpi.accent }}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] text-[#41586a]">
          <span className="font-bold text-[#023047]">Umsatzanteile</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <i className="h-2 w-2 rounded-full bg-[#ff8a00]" /> organisch
            </span>
            <span className="flex items-center gap-1">
              <i className="h-2 w-2 rounded-full bg-[#cdd9e1]" /> Ads
            </span>
          </span>
        </div>
        <svg viewBox="0 0 380 130" className="mt-2 w-full" aria-hidden>
          <defs>
            <linearGradient id="dash-organic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff8a00" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff8a00" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[26, 52, 78, 104].map((y) => (
            <line key={y} x1="0" x2="380" y1={y} y2={y} stroke="#eef2f5" strokeWidth="1" />
          ))}
          <path
            d="M0 96 C40 92 70 84 105 76 C150 66 185 56 230 44 C275 33 320 26 380 18 L380 130 L0 130 Z"
            fill="url(#dash-organic)"
          />
          <path
            d="M0 96 C40 92 70 84 105 76 C150 66 185 56 230 44 C275 33 320 26 380 18"
            fill="none"
            stroke="#ff8a00"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M0 70 C50 74 90 82 140 88 C190 94 250 100 380 106"
            fill="none"
            stroke="#cdd9e1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="380" cy="18" r="4.5" fill="#ff8a00" />
          <circle cx="380" cy="106" r="4.5" fill="#cdd9e1" />
        </svg>
      </div>
    </div>
  );
}

export function MetricChip({
  label,
  value,
  accent = "#ff8a00",
  className = "",
}: {
  label: string;
  value: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl bg-white py-2.5 pl-3 pr-4 ring-1 ring-[#e3e9ee] ${className}`}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: `${accent}1a` }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
          <path
            d="M2 12l4-4 3 3 5-6"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        <span className="block text-[10px] font-bold uppercase tracking-wide text-[#41586a]">
          {label}
        </span>
        <span className="block text-sm font-extrabold text-[#023047]">{value}</span>
      </span>
    </div>
  );
}
