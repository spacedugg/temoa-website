"use client";
import { useId, useState } from "react";
import Image from "next/image";
import type { Sprache } from "@/lib/i18n";
import { SERVICE_LISTING_IMAGES } from "@/lib/service-listing-images";
import styles from "./ServiceVisual.module.css";

function PerformanceGraph({ strategy = false }: { strategy?: boolean }) {
  const id = useId();
  return <svg viewBox="0 0 360 160" className="absolute inset-x-2 bottom-3 h-[142px] w-[calc(100%_-_1rem)]" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={id+"fill"} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#40edc3" stopOpacity=".28"/><stop offset="1" stopColor="#40edc3" stopOpacity="0"/></linearGradient>
      <radialGradient id={id+"burst"}><stop stopColor="#54ffd9" stopOpacity=".65"/><stop offset=".35" stopColor="#12c7fa" stopOpacity=".25"/><stop offset="1" stopColor="#663df4" stopOpacity="0"/></radialGradient>
      <filter id={id+"glow"} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    {[38,76,114,152].map(y=><path key={y} d={`M12 ${y} H350`} stroke="white" strokeOpacity=".07"/>)}
    {[56,112,168,224,280,336].map(x=><path key={x} d={`M${x} 20 V152`} stroke="white" strokeOpacity=".04"/>)}
    <ellipse cx="308" cy="42" rx="85" ry="68" fill={`url(#${id}burst)`} />
    <path d="M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16 V154 H12 Z" fill={`url(#${id}fill)`} />
    <path d="M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16" stroke="#49f4c6" strokeWidth="7" opacity=".3" filter={`url(#${id}glow)`} />
    <path d="M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16" stroke="#49f4c6" strokeWidth="2.8" strokeLinecap="round"/>
    <path d="M12 149 C60 144 80 137 112 141 S166 118 198 121 S245 98 270 99 S315 70 345 56" stroke="#4ebcff" strokeWidth="2" strokeLinecap="round"/>
    <path d={strategy ? "M12 77 C48 65 78 87 112 68 S170 79 208 54 S285 66 345 38" : "M12 42 C50 39 65 62 99 59 S157 80 180 76 S222 102 251 100 S303 131 345 138"} stroke="#ffad68" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 4"/>
    <circle cx="345" cy="16" r="5" fill="#d2fff0"/><circle cx="345" cy="16" r="12" stroke="#78ffdf" strokeOpacity=".35"/>
    <path d="M328 16H352 M345 4V29" stroke="#9cffe9" strokeOpacity=".7"/>
  </svg>;
}
export function ServiceVisual({ index, sprache }: { index: number; sprache: Sprache }) {
  const de = sprache === "de";
  const [paused, setPaused] = useState(false);
  if (index === 1) return (
    <div className={`${styles.listingWindow} ${paused ? styles.paused : ""}`} role="group" aria-label={de ? "Gemischte Listingbilder aus unseren Designbeispielen" : "Mixed listing images from our design examples"}>
      <div className={styles.columns}>
        {[18,32,24].map((duration,column)=>{
          const images = SERVICE_LISTING_IMAGES.filter((_,i)=>i%3===column);
          return <div className={styles.columnViewport} key={duration}><div className={styles.track} style={{animationDuration:duration+"s"}}>
            {[0,1].map(copy=><div className={styles.sequence} key={copy} aria-hidden={copy===1 ? true : undefined}>
              {images.map(im=><div className={styles.listingCard} key={im.url}><Image src={im.url} alt={copy===0 ? im.alt : ""} width={160} height={160} sizes="(min-width: 1024px) 120px, (min-width: 640px) 16vw, 30vw" className="h-full w-full object-cover" /></div>)}
            </div>)}
          </div></div>;
        })}
      </div>
      <button type="button" aria-pressed={paused} onClick={()=>setPaused(p=>!p)} className={styles.pause} aria-label={paused ? (de?"Bildvorschau fortsetzen":"Resume image preview") : (de?"Bildvorschau pausieren":"Pause image preview")}>{paused ? "▶" : "Ⅱ"}</button>
    </div>
  );
  return (
    <div className={styles.visual} role="img" aria-label={[
      de?"Schematische PPC-Performance: CTR und Conversion steigen, TACoS sinkt":"Illustrative PPC performance: CTR and conversion rise, TACoS falls",
      "",
      de?"Account-Überwachung mit Buy Box, Account Health und Support-Fällen":"Account monitoring with Buy Box, account health and support cases",
      de?"Vernetzte Amazon-Marktplätze in Pan-EU und den USA":"Connected Amazon marketplaces in Pan-EU and the US",
      de?"Analyse von Preisposition, Marge und Deal-Chancen":"Analysis of price position, margin and deal opportunities",
    ][index]}>
      <span className={styles.ambient} aria-hidden="true" />
      {index===0 && <>
        <div className={styles.topline}><span>PERFORMANCE</span><span className={styles.liveDot}/></div>
        <div className={styles.legend}><span className={styles.green}>↗ CTR</span><span className={styles.blue}>↗ Conversion</span><span className={styles.orange}>↘ TACoS</span></div>
        <PerformanceGraph />
      </>}
      {index===2 && <>
        <div className={styles.topline}><span>ACCOUNT CONTROL</span><span className={styles.liveDot}/></div>
        <svg viewBox="0 0 360 160" className="absolute inset-0 h-full w-full" aria-hidden="true"><path d="M60 60H180V120H310 M180 60H310" stroke="#3fdbd4" strokeOpacity=".4" fill="none"/><circle cx="180" cy="60" r="40" fill="#35cfd6" fillOpacity=".07"/></svg>
        <div className={styles.statusGrid}><div><span>BUY BOX</span><strong className={styles.green}>◉ {de?"Im Blick":"Monitored"}</strong></div><div><span>ACCOUNT HEALTH</span><strong className={styles.blue}>✓ {de?"Geprüft":"Reviewed"}</strong></div></div>
        <div className={styles.caseRow}><span>{de?"Listing-Korrektur":"Listing update"}</span><b className={styles.orange}>{de?"In Bearbeitung":"In progress"}</b></div>
        <div className={styles.caseRow}><span>{de?"Support-Fall":"Support case"}</span><b className={styles.green}>✓ {de?"Gelöst":"Resolved"}</b></div>
      </>}
      {index===3 && <>
        <div className={styles.topline}><span>MARKETPLACE NETWORK</span><span className={styles.liveDot}/></div>
        <div className={styles.markets}><div><p>Pan-EU</p><div className={styles.flags}>{[["🇩🇪","DE"],["🇫🇷","FR"],["🇮🇹","IT"],["🇪🇸","ES"],["🇳🇱","NL"],["🇵🇱","PL"],["🇸🇪","SE"],["🇧🇪","BE"]].map(([flag,label])=><span key={label}><b>{flag}</b><small>{label}</small></span>)}</div></div><span className={styles.connection}>···</span><div className={styles.usMarket}><p>US</p><b>🇺🇸</b><small>amazon.com</small></div></div>
      </>}
      {index===4 && <>
        <div className={styles.topline}><span>PRICING & DEALS</span><span className={styles.liveDot}/></div>
        <div className={styles.legend}><span className={styles.green}>{de?"Marge":"Margin"}</span><span className={styles.blue}>{de?"Preisposition":"Price position"}</span><span className={styles.orange}>{de?"Deal-Potenzial":"Deal potential"}</span></div>
        <PerformanceGraph strategy/>
        <span className={styles.analysisChip}>{de?"Analysieren → Priorisieren":"Analyze → Prioritize"}</span>
      </>}
    </div>
  );
}

/** Original photograph with a vector contour, so the faces are never regenerated. */
export function FoundersCutout({ label }: { label: string }) {
  const id = useId();
  return (
    <div className="relative h-[188px] w-full shrink-0 px-3 pt-2">
      <svg viewBox="0 80 900 520" role="img" aria-label={label} className="relative h-full w-full">
        <defs><clipPath id={id}><path clipRule="evenodd" d="M126 600 C92 572 82 525 85 462 L86 363 Q90 313 123 289 L192 255 216 242 225 225 Q211 205 214 167 Q212 134 233 120 Q254 101 283 108 Q323 107 337 143 Q347 170 338 202 L333 226 340 244 Q372 266 386 310 L410 291 442 275 451 260 Q438 235 442 211 Q442 181 466 171 Q490 151 514 167 Q541 182 544 217 Q546 239 534 272 L562 294 590 314 604 289 633 267 641 247 Q627 221 631 187 L633 160 Q637 130 665 123 Q694 110 720 130 Q744 144 744 174 L744 204 735 249 773 267 Q847 285 900 357 L900 600 Z M374 463 Q365 503 367 550 L362 600 L397 600 Q388 558 398 518 Q404 491 392 466 Z" /></clipPath></defs>
        <image href="/team/Main.webp" width="900" height="600" clipPath={`url(#${id})`} />
      </svg>
    </div>
  );
}
