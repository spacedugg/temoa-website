"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Ring, BarChart, AreaChart } from "../ui/MiniChart";
import { Counter } from "../ui/Counter";

const pillars = [
  {
    key: "strategie",
    product: "Strategy Suite",
    label: "Strategie",
    tag: "Analyse, Margen & KPI-Steuerung",
    title: "Wettbewerbs- & Keyword-Analyse",
    metric: "Marktanteil",
    body: "Wir wissen, wer wofür rankt und zu welchem Preis. Der nächste Hebel liegt offen.",
    tint: "bg-brand-50",
    color: "#FF9900",
    visual: "share",
  },
  {
    key: "content",
    product: "Content Studio",
    label: "Content",
    tag: "Bilder, A+, SEO & Brand Store",
    title: "Listing & A+ Content",
    metric: "Retail-ready",
    body: "Bilder, A+ und SEO, die aus Klicks Käufer machen, abgestimmt auf den Amazon-Algorithmus.",
    tint: "bg-red/[0.08]",
    color: "#FF3131",
    visual: "conversion",
  },
  {
    key: "advertising",
    product: "Advertising Engine",
    label: "Advertising",
    tag: "Sponsored Products, Brands & Display",
    title: "PPC Performance",
    metric: "ROAS 4,8×",
    body: "Kampagnen, die profitabel skalieren. Weniger Streuverluste, höherer Return on Ad Spend.",
    tint: "bg-navy/[0.07]",
    color: "#023047",
    visual: "roas",
  },
  {
    key: "account",
    product: "Management Hub",
    label: "Account",
    tag: "Inventar, Buy-Box & Reporting",
    title: "Inventar & Buy-Box",
    metric: "Stabile Buy-Box",
    body: "Forecasting, Buy-Box und Reporting. Euer Konto läuft, ohne dass ihr ran müsst.",
    tint: "bg-cyan/[0.10]",
    color: "#2A9BD8",
    visual: "buybox",
  },
  {
    key: "international",
    product: "Markets",
    label: "International",
    tag: "Lokalisierung & 5+ Marktplätze",
    title: "Internationalisierung",
    metric: "5+ Marktplätze",
    body: "Euer erprobtes Setup auf neue Märkte ausgerollt, lokalisiert statt nur übersetzt.",
    tint: "bg-emerald/10",
    color: "#0E7CA0",
    visual: "markets",
  },
];

function PillarVisual({ type }: { type: string }) {
  switch (type) {
    case "share":
      return (
        <div className="space-y-3">
          {[
            { n: "TEMOA-Marke", v: 68, c: "#FF9900" },
            { n: "Wettbewerber A", v: 44, c: "rgba(2,48,71,0.18)" },
            { n: "Wettbewerber B", v: 31, c: "rgba(2,48,71,0.18)" },
          ].map((row, i) => (
            <div key={row.n}>
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="font-medium text-ink">{row.n}</span>
                <span className="font-semibold text-ink-faint">{row.v}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-navy/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.v}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12 }}
                  className="h-full rounded-full"
                  style={{ background: row.c }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "conversion":
      return (
        <div className="flex items-center justify-around gap-4">
          <Ring value={12} label="CVR +" color="#FF3131" size={104} />
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-500" /> Hauptbild</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red" /> A+ Module</div>
            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan" /> SEO-Text</div>
          </div>
        </div>
      );
    case "roas":
      return (
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-ink"><Counter to={4.8} decimals={1} suffix="×" /></span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">ROAS</span>
          </div>
          <BarChart className="mt-4 h-16" values={[40, 48, 44, 56, 62, 70, 84, 96]} highlight={7} colorHighlight="#FF9900" color="rgba(2,48,71,0.18)" />
        </div>
      );
    case "buybox":
      return (
        <div>
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">Buy-Box · 6 Monate</span>
            <span className="font-bold text-emerald">100 %</span>
          </div>
          <AreaChart className="h-20 w-full" stroke="#2A9BD8" fill="rgba(42,155,216,0.18)" points={[88, 92, 95, 98, 97, 99, 100, 100]} />
        </div>
      );
    case "markets":
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {["DE", "FR", "IT", "ES", "NL"].map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold ${i === 0 ? "border-transparent bg-brand-500 text-white" : "border-navy/[0.08] bg-white text-ink"}`}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <AreaChart className="h-12 w-full" stroke="#0E7CA0" fill="rgba(14,124,160,0.16)" points={[20, 34, 30, 48, 52, 68, 80]} />
        </div>
      );
    default:
      return null;
  }
}

/* Tab list + active panel — shared between pinned (desktop) and stacked (mobile) */
function Panel({ active }: { active: number }) {
  const p = pillars[active];
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.4 }}
          className="card noise relative flex h-full min-h-[20rem] flex-col justify-between overflow-hidden p-8"
        >
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl" style={{ background: p.color }} />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
              <span className="eyebrow !text-ink-muted">{p.product}</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-ink">{p.title}</h3>
            <p className="mt-1 text-sm font-semibold text-gradient">{p.metric}</p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{p.body}</p>
          </div>
          <div className="relative mt-8 rounded-2xl border border-navy/[0.06] bg-white/70 p-5">
            <PillarVisual type={p.visual} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Tab({
  p,
  index,
  isActive,
  onClick,
}: {
  p: (typeof pillars)[number];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
        isActive ? "border-transparent bg-white shadow-lift" : "border-navy/[0.07] bg-white/40 hover:bg-white/70"
      }`}
    >
      {/* progress fill while active (pinned mode) */}
      {isActive && (
        <motion.span
          layoutId="tab-active-bar"
          className="absolute inset-y-0 left-0 w-1 rounded-full"
          style={{ background: p.color }}
        />
      )}
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${p.tint}`}>
          <span className="text-lg font-extrabold tabular-nums" style={{ color: p.color }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="font-bold text-ink">{p.label}</span>
            <span className="text-xs font-medium text-brand-600">{p.product}</span>
          </div>
          <span className="text-xs text-ink-faint">{p.tag}</span>
        </div>
      </div>
    </button>
  );
}

export function FullService() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const f = () => setDesktop(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!desktop) return;
    const i = Math.min(pillars.length - 1, Math.max(0, Math.floor(p * pillars.length)));
    setActive(i);
  });

  // Click a tab → scroll the window so that tab's segment is in view (pinned mode)
  const jumpTo = (i: number) => {
    if (desktop && ref.current) {
      const top = ref.current.offsetTop + (i + 0.5) * window.innerHeight - window.innerHeight / 2;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      setActive(i);
    }
  };

  return (
    <section
      id="full-service"
      ref={ref}
      className="relative bg-canvas-alt lg:[height:var(--pin-h)]"
      style={{ ["--pin-h" as string]: `${pillars.length * 100}vh` }}
    >
      <div className="flex flex-col justify-center overflow-hidden py-20 md:py-28 lg:sticky lg:top-0 lg:min-h-screen lg:py-0">
        <div className="container-x relative w-full">
          <SectionHeading
            eyebrow="Full Service 360°"
            title={<>Fünf Bereiche, <span className="text-gradient">ein System.</span></>}
            description="Strategie, Listing, Advertising, Betrieb und Internationalisierung greifen bei uns ineinander, statt sich auf Dienstleister zu verteilen."
          />

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Tabs */}
            <div className="flex flex-col gap-3">
              {pillars.map((p, i) => (
                <Tab key={p.key} p={p} index={i} isActive={active === i} onClick={() => jumpTo(i)} />
              ))}

              {/* scroll progress dots (pinned hint) */}
              <div className="mt-2 hidden items-center gap-2 lg:flex">
                {pillars.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-7 bg-brand-500" : "w-1.5 bg-navy/15"}`}
                  />
                ))}
                <span className="ml-2 text-xs text-ink-faint">Scrollen blättert die Bereiche durch</span>
              </div>
            </div>

            {/* Active panel */}
            <Panel active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
