"use client";

import { useId, useState, type ReactNode } from "react";
import Image from "next/image";
import type { Sprache } from "@/lib/i18n";

const photoSizes = "(min-width: 1024px) 180px, (min-width: 640px) 24vw, 45vw";
function Product({ src, className = "" }: { src: string; className?: string }) {
  return <Image src={src} alt="" width={220} height={220} sizes={photoSizes} className={`h-full min-h-0 w-full object-contain ${className}`} />;
}
function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="h-full overflow-hidden rounded-xl bg-white text-[#233a4d] shadow-[0_8px_25px_-12px_rgba(0,0,0,0.4)]">
      <div className="flex h-7 items-center justify-between border-b border-slate-200 bg-slate-50 px-3">
        <span className="text-[0.65rem] font-bold">{title}</span>
        <span className="text-[0.55rem] font-medium text-slate-500">Mockup</span>
      </div>
      {children}
    </div>
  );
}
function Trend({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 100 32" className="mt-2 h-7 w-full" fill="none" aria-hidden="true"><path d={down ? "M0 5 18 11 34 8 52 20 70 18 85 26 100 29" : "M0 29 18 23 34 26 52 14 70 16 85 6 100 3"} stroke="#258766" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ServiceVisual({ index, sprache }: { index: number; sprache: Sprache }) {
  const de = sprache === "de";
  const [variant, setVariant] = useState(0);
  const variants = de ? ["Galerie", "Listing", "A+ Content"] : ["Gallery", "Listing", "A+ Content"];
  const label = [
    de ? "Mockup zur Steuerung von PPC-Kennzahlen" : "PPC KPI management mockup",
    de ? "Drei Ansichten für Produktbilder und A+ Content" : "Three product image and A+ content previews",
    de ? "Mockup für Account-Pflege, Buy Box und Support-Fälle" : "Account, Buy Box and support case mockup",
    de ? "Amazon-Marktplätze in Pan-EU und den USA" : "Amazon marketplaces in Pan-EU and the US",
    de ? "Mockup für Pricing, Deals und Strategieanalysen" : "Pricing, deals and strategy analysis mockup",
  ][index];
  return (
    <div role="group" aria-label={label} className="relative h-[178px] shrink-0 overflow-hidden bg-[#e9eff3] p-3 md:h-[188px] md:p-4">
      {index === 0 && (
        <Window title="Advertising">
          <div className="grid grid-cols-4 gap-2 p-3">
            {["ACoS", "TACoS", "CTR", "ROAS"].map((name, i) => (
              <div key={name} className="rounded-md bg-[#f0f6f5] p-2">
                <span className="text-[0.65rem] font-bold">{name}</span><Trend down={i < 2} />
              </div>
            ))}
          </div>
          <div className="mx-3 flex items-center justify-between rounded-md bg-slate-50 px-2 py-1 text-[0.58rem]">
            <span>Sponsored Products</span><span className="font-bold text-[#258766]">{de ? "Budget & Gebote" : "Budget & bids"}</span>
          </div>
          <div className="mx-3 mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-2/3 rounded-full bg-[#F5A623]" /></div>
        </Window>
      )}
      {index === 1 && (
        <div className="flex h-full flex-col">
          <div className="mb-2 flex shrink-0 gap-1" role="group" aria-label={de ? "Content-Ansicht wählen" : "Choose content preview"}>
            {variants.map((name, i) => <button key={name} type="button" aria-pressed={variant === i} onClick={() => setVariant(i)} className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${variant === i ? "bg-navy text-white" : "bg-white text-navy hover:bg-slate-100"}`}>{name}</button>)}
          </div>
          <div className="min-h-0 flex-1 overflow-hidden rounded-lg bg-white p-2" aria-live="polite" aria-label={variants[variant]}>
            {variant === 0 && <div className="grid h-full grid-cols-[1fr_1.6fr] gap-2">
              <Product src="/bilder/miganeo/l-1-klein.webp" />
              <div className="grid min-h-0 grid-cols-3 grid-rows-2 gap-1">{[2,3,4,5,6,7].map((n,i)=><Product key={i} src={`/case_studies/bachgold/p1-${n}.webp`} className="rounded-sm" />)}</div>
            </div>}
            {variant === 1 && <div className="grid h-full grid-cols-[1fr_1.5fr] gap-3">
              <Product src="/bilder/miganeo/l-1-klein.webp" />
              <div className="flex min-h-0 flex-col gap-1.5 py-1"><div className="h-2 w-full rounded bg-slate-300" /><div className="h-2 w-4/5 rounded bg-slate-200" /><div className="my-1 text-[0.65rem] tracking-wider text-[#bc7600]" aria-hidden="true">★★★★★</div><div className="h-1 w-full bg-slate-100" /><div className="h-1 w-5/6 bg-slate-100" /><div className="min-h-0 flex-1"><Product src="/bilder/miganeo/a-1-klein.webp" /></div></div>
            </div>}
            {variant === 2 && <div className="grid h-full grid-cols-2 grid-rows-2 gap-1.5">{[1,2,4,6].map(n=><Product key={n} src={`/case_studies/bachgold/p1-aplus-${n}.webp`} className="object-cover" />)}</div>}
          </div>
        </div>
      )}
      {index === 2 && (
        <Window title="Seller Central">
          <div className="grid grid-cols-2 gap-2 px-3 pt-2">
            {[["Buy Box",de ? "Im Blick" : "Monitored"],["Account Health",de ? "Geprüft" : "Reviewed"]].map(([a,b])=><div key={a} className="flex items-center justify-between rounded bg-[#eff6f2] px-2 py-2 text-[0.6rem]"><span className="font-bold">{a}</span><span className="text-[#258766]">✓ {b}</span></div>)}
          </div>
          <div className="px-3 pt-2 text-[0.6rem]">
            <div className="flex justify-between border-b border-slate-100 py-1.5"><span>{de ? "Listing-Korrektur" : "Listing update"}</span><span className="rounded bg-amber-50 px-1.5 font-semibold text-amber-800">{de ? "In Bearbeitung" : "In progress"}</span></div>
            <div className="flex justify-between py-1.5"><span>{de ? "Support-Fall" : "Support case"}</span><span className="rounded bg-emerald-50 px-1.5 font-semibold text-emerald-800">{de ? "Gelöst" : "Resolved"}</span></div>
          </div>
        </Window>
      )}
      {index === 3 && (
        <div className="flex h-full items-center gap-3 rounded-xl bg-white p-3 text-navy shadow-sm">
          <div className="min-w-0 flex-1"><p className="mb-2 text-[0.65rem] font-bold">Pan-EU</p><div className="grid grid-cols-4 gap-1.5">{[["🇩🇪","DE"],["🇫🇷","FR"],["🇮🇹","IT"],["🇪🇸","ES"],["🇳🇱","NL"],["🇵🇱","PL"],["🇸🇪","SE"],["🇧🇪","BE"]].map(([flag,country])=><div key={country} className="rounded-md bg-slate-50 py-1 text-center"><span className="block text-xl leading-none" role="img" aria-label={country}>{flag}</span><span className="text-[0.55rem] font-bold">{country}</span></div>)}</div></div>
          <div className="flex h-full w-1/4 flex-col items-center justify-center rounded-lg bg-[#fff4e5]"><span className="text-[0.65rem] font-bold">US</span><span className="my-2 text-4xl" role="img" aria-label="United States">🇺🇸</span><span className="text-[0.55rem] font-semibold">amazon.com</span></div>
        </div>
      )}
      {index === 4 && (
        <Window title={de ? "Analyse · Pricing & Deals" : "Analysis · Pricing & deals"}>
          <div className="grid h-[calc(100%_-_1.75rem)] grid-cols-[0.8fr_1.2fr] gap-3 p-3">
            <div className="rounded-md bg-[#f0f5f7] p-2"><span className="text-[0.6rem] font-bold">{de ? "Preisposition" : "Price position"}</span><svg viewBox="0 0 100 65" className="mt-2 h-14 w-full" fill="none" aria-hidden="true"><path d="M0 47 20 39 40 45 60 27 80 32 100 15" stroke="#183e54" strokeWidth="3"/><path d="M0 55 20 50 40 51 60 44 80 43 100 38" stroke="#f5a623" strokeWidth="3" strokeDasharray="4 3"/></svg></div>
            <div className="space-y-2 pt-1">{(de ? ["Marge prüfen","Deals planen","Chancen priorisieren"] : ["Review margins","Plan deals","Prioritize opportunities"]).map((label,i)=><div key={label} className="flex items-center gap-2 text-[0.6rem] font-semibold"><span className="h-2 w-2 shrink-0 rounded-full bg-[#f5a623]" /><span>{label}</span></div>)}</div>
          </div>
        </Window>
      )}
    </div>
  );
}

/** Original photograph with a vector contour, so the faces are never regenerated. */
export function FoundersCutout({ label }: { label: string }) {
  const id = useId();
  return (
    <div className="relative h-[188px] shrink-0 bg-[radial-gradient(ellipse_at_bottom,#dae5ec,transparent_70%)] px-5 pt-2">
      <span aria-hidden="true" className="absolute inset-x-10 bottom-2 h-4 rounded-[50%] bg-navy/25 blur-md" />
      <svg viewBox="0 80 900 520" role="img" aria-label={label} className="relative h-full w-full drop-shadow-[0_8px_6px_rgba(0,0,0,0.2)]">
        <defs><clipPath id={id}><path clipRule="evenodd" d="M126 600 C92 572 82 525 85 462 L86 363 Q90 313 123 289 L192 255 216 242 225 225 Q211 205 214 167 Q212 134 233 120 Q254 101 283 108 Q323 107 337 143 Q347 170 338 202 L333 226 340 244 Q372 266 386 310 L410 291 442 275 451 260 Q438 235 442 211 Q442 181 466 171 Q490 151 514 167 Q541 182 544 217 Q546 239 534 272 L562 294 590 314 604 289 633 267 641 247 Q627 221 631 187 L633 160 Q637 130 665 123 Q694 110 720 130 Q744 144 744 174 L744 204 735 249 773 267 Q847 285 900 357 L900 600 Z M374 463 Q365 503 367 550 L362 600 L397 600 Q388 558 398 518 Q404 491 392 466 Z" /></clipPath></defs>
        <image href="/team/Main.webp" width="900" height="600" clipPath={`url(#${id})`} />
      </svg>
    </div>
  );
}
