"use client";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "../Logo";
import Image from "next/image";
import type { Sprache } from "@/lib/i18n";
import { SERVICE_LISTING_IMAGES } from "@/lib/service-listing-images";
import styles from "./ServiceVisual.module.css";

function PerformanceGraph() {
  const id = useId();
  const reduce = useReducedMotion();
  const draw = (delay: number) => ({ initial: { pathLength: reduce ? 1 : 0 }, whileInView: { pathLength: 1 }, viewport: { once: true, amount: 0.6 }, transition: { duration: reduce ? 0 : 1.8, delay: reduce ? 0 : delay, ease: "easeInOut" as const } });
  return <svg viewBox="0 0 360 160" className="absolute inset-x-2 bottom-3 h-[142px] w-[calc(100%_-_1rem)]" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={id+"fill"} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#40edc3" stopOpacity=".28"/><stop offset="1" stopColor="#40edc3" stopOpacity="0"/></linearGradient>
      <radialGradient id={id+"burst"}><stop stopColor="#54ffd9" stopOpacity=".65"/><stop offset=".35" stopColor="#12c7fa" stopOpacity=".25"/><stop offset="1" stopColor="#663df4" stopOpacity="0"/></radialGradient>
      <filter id={id+"glow"} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    {[38,76,114,152].map(y=><path key={y} d={`M12 ${y} H350`} stroke="white" strokeOpacity=".07"/>)}
    {[56,112,168,224,280,336].map(x=><path key={x} d={`M${x} 20 V152`} stroke="white" strokeOpacity=".04"/>)}
    <ellipse cx="308" cy="42" rx="85" ry="68" fill={`url(#${id}burst)`} />
    <motion.path initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:reduce?0:1,delay:reduce?0:1}} d="M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16 V154 H12 Z" fill={`url(#${id}fill)`} />
    <motion.path {...draw(0.15)} d="M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16" stroke="#49f4c6" strokeWidth="7" opacity=".3" filter={`url(#${id}glow)`} />
    <motion.path {...draw(0.15)} d="M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16" stroke="#49f4c6" strokeWidth="2.8" strokeLinecap="round"/>
    <motion.path {...draw(0.3)} d="M12 149 C60 144 80 137 112 141 S166 118 198 121 S245 98 270 99 S315 70 345 56" stroke="#4ebcff" strokeWidth="2" strokeLinecap="round"/>
    <motion.path {...draw(0.45)} d="M12 42 C50 39 65 62 99 59 S157 80 180 76 S222 102 251 100 S303 131 345 138" stroke="#ffad68" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 4"/>
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
      de?"Schematischer Amazon-Supportfall: Listing korrigiert und Fall gelöst":"Illustrative Amazon support ticket: listing corrected and case resolved",
      de?"Vernetzte Amazon-Marktplätze in Pan-EU und den USA":"Connected Amazon marketplaces in Pan-EU and the US",
      de?"Schematische Produktseite mit Deal-Aktion und abgestimmter Preisplanung":"Illustrative product listing with a deal and coordinated pricing",
    ][index]}>
      <span className={styles.ambient} aria-hidden="true" />
      {index===0 && <>
        
        <div className={styles.legend}><span className={styles.green}>↗ CTR</span><span className={styles.blue}>↗ Conversion</span><span className={styles.orange}>↘ TACoS</span></div>
        <PerformanceGraph />
      </>}
      {index===2 && <SupportTicket de={de}/>}
      {index===3 && <MarketGlobe/>}
      {index===4 && <DealPreview de={de}/>}
    </div>
  );
}

function SupportTicket({ de }: { de: boolean }) {
  return <div className={styles.ticket} aria-hidden="true">
    <div className={styles.ticketHeader}><span className={styles.ticketIcon}>↗</span><div><strong>Amazon Seller Support</strong><small>{de?"Katalog & Listing":"Catalog & listing"}</small></div><span className={styles.resolved}>✓ {de?"Gelöst":"Resolved"}</span></div>
    <div className={styles.message}><span className={styles.avatar}>t</span><div><b>temoa</b><p>{de?"Bitte die Produktvariante korrekt zuordnen.":"Please correct the product variation."}</p><i/><i/></div></div>
    <div className={styles.reply}><span>✓</span><div><b>Amazon Support</b><p>{de?"Die Zuordnung wurde korrigiert.":"The variation has been corrected."}</p></div></div>
    <div className={styles.ticketFooter}><span className={styles.green}>● {de?"Listing aktualisiert":"Listing updated"}</span><span>temoa ↔ Amazon</span></div>
  </div>;
}

function DealPreview({ de }: { de: boolean }) {
  return <div className={styles.dealScene} aria-hidden="true">
    <div className={styles.dealListing}>
      <div className={styles.productStage}><svg viewBox="0 0 100 130" fill="none"><defs><linearGradient id="bottle-metal" x2="1" y2=".2"><stop stopColor="#97b7bd"/><stop offset=".25" stopColor="#f2ffff"/><stop offset=".5" stopColor="#7fa0a9"/><stop offset=".8" stopColor="#cadce0"/><stop offset="1" stopColor="#5e7d85"/></linearGradient></defs><ellipse cx="50" cy="118" rx="29" ry="5" fill="#0b2139" opacity=".14"/><rect x="31" y="33" width="38" height="83" rx="12" fill="url(#bottle-metal)"/><path d="M35 35V24Q35 18 41 18H59Q65 18 65 24V35" fill="#193b47"/><path d="M40 19V13Q40 8 45 8H55Q60 8 60 13V19" stroke="#193b47" strokeWidth="5"/><path d="M38 49V97" stroke="white" opacity=".6" strokeWidth="2" strokeLinecap="round"/></svg></div>
      <div className={styles.dealCopy}><span className={styles.dealBadge}>{de?"Zeitlich begrenztes Angebot":"Limited-time deal"}</span><strong>{de?"Thermo-Trinkflasche":"Insulated water bottle"}</strong><span className={styles.productLines}><i/><i/></span><div className={styles.dealPrice}><span>€€</span><s>€€€</s></div><div className={styles.cartBar}/></div>
    </div>
    <div className={styles.dealPlan}><span>✓ {de?"Preisstrategie":"Pricing strategy"}</span><span>✓ {de?"Deal-Planung":"Deal planning"}</span><span>✓ {de?"Marge im Blick":"Margin in focus"}</span></div>
  </div>;
}

/** Stylized Atlantic globe, with Europe as the main focus and a US connection. */
function MarketGlobe() {
  const id = useId();
  const reduce = useReducedMotion();
  return <svg viewBox="0 0 380 188" className={styles.globe} fill="none" aria-hidden="true">
    <defs><radialGradient id={id+"ocean"} cx=".65" cy=".3" r=".75"><stop stopColor="#245775"/><stop offset=".7" stopColor="#102f49"/><stop offset="1" stopColor="#05172b"/></radialGradient><radialGradient id={id+"light"}><stop stopColor="#34edd0" stopOpacity=".3"/><stop offset="1" stopColor="#34edd0" stopOpacity="0"/></radialGradient><clipPath id={id+"edge"}><ellipse cx="207" cy="160" rx="190" ry="151"/></clipPath><linearGradient id={id+"route"}><stop stopColor="#75ceff"/><stop offset="1" stopColor="#60f5d2"/></linearGradient></defs>
    <ellipse cx="207" cy="160" rx="190" ry="151" fill={`url(#${id}ocean)`} stroke="#6baccc" strokeOpacity=".2"/>
    <g clipPath={`url(#${id}edge)`}>
      {[52,90,131,174].map(y=><path key={y} d={`M15 ${y} Q207 ${y-48} 397 ${y}`} stroke="#8eb8cc" strokeOpacity=".12"/>)}
      {[70,128,207,286,344].map(x=><path key={x} d={`M207 8 Q${x-95} 120 ${x} 300`} stroke="#8eb8cc" strokeOpacity=".1"/>)}
      <ellipse cx="280" cy="80" rx="98" ry="88" fill={`url(#${id}light)`}/>
      <g fill="#386981" stroke="#78a6b6" strokeWidth=".7" strokeLinejoin="round">
        <path d="M23 58L47 44 74 39 93 49 111 48 127 63 116 76 139 93 132 108 117 104 113 122 96 119 84 107 61 101 51 86 31 84Z"/>
        <path d="M84 109L98 120 111 127 123 127 135 140 130 146 115 138 104 135 92 129Z"/>
        <path d="M139 29L159 17 180 24 176 40 161 55 149 48Z"/>
        <path d="M238 119L258 113 280 122 287 141 302 156 293 181 274 212 261 202 253 175 235 152Z"/>
        <path d="M291 64L307 51 328 56 348 48 376 66 396 78 396 126 371 137 349 124 330 127 315 109 297 108 281 91Z"/>
      </g>
      <g fill="#64c9c1" stroke="#9aeee0" strokeWidth=".8" strokeLinejoin="round">
        <path d="M239 94L249 82 261 85 268 76 280 76 292 64 305 70 304 88 291 94 280 105 270 102 266 114 254 108 242 111 237 103Z"/>
        <path d="M264 75L266 60 280 40 289 35 291 47 279 65 277 76Z"/>
        <path d="M228 84L232 72 238 68 242 81 237 88Z M222 84L225 77 229 78 229 85Z"/>
        <path d="M273 105L279 109 280 118 287 124 284 128 275 120 270 111Z M294 101L302 110 298 115 292 110Z"/>
      </g>
      <motion.path d="M102 96 Q169 -5 268 89" stroke={`url(#${id}route)`} strokeWidth="2" initial={{pathLength:reduce?1:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:reduce?0:2,ease:"easeInOut"}}/>
      <path d="M102 96 Q169 -5 268 89" stroke="#6df5dc" strokeWidth="9" opacity=".1"/>
      {[[102,96],[268,89],[257,97],[278,80],[246,89],[284,94],[263,105]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={i<2?9:5} fill="#56f0d0" opacity=".1"/><circle cx={x} cy={y} r={i<2?3:1.7} fill={i===0?"#85d5ff":"#9bffe9"}/></g>)}
    </g>
    <g fontFamily="inherit" fontWeight="700"><rect x="59" y="109" width="51" height="25" rx="12" fill="#102d46" stroke="#77cbf4" strokeOpacity=".4"/><text x="84.5" y="126" textAnchor="middle" fontSize="11" fill="#b5e8ff">US</text><rect x="246" y="132" width="86" height="29" rx="14" fill="#164c59" stroke="#7cf4d4" strokeOpacity=".6"/><text x="289" y="151" textAnchor="middle" fontSize="12" fill="#c6fff1">Pan-EU</text></g>
  </svg>;
}

export function FullServiceHub({ sprache }: { sprache: Sprache }) {
  const de = sprache === "de";
  const reduce = useReducedMotion();
  const labels = ["PPC", "Content & SEO", "Account", "Pan-EU & US", de?"Strategie":"Strategy"];
  const positions = [[59,37],[270,32],[326,128],[260,222],[53,200]];
  return <div className={styles.hub} role="group" aria-label={de?"Fünf Leistungsbereiche laufen bei temoa zusammen":"Five service areas come together at temoa"}>
    <svg viewBox="0 0 380 260" className={styles.hubLines} fill="none" aria-hidden="true">
      <defs><radialGradient id="hub-aura"><stop stopColor="#25b6bd" stopOpacity=".22"/><stop offset="1" stopColor="#25b6bd" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="190" cy="130" rx="150" ry="112" fill="url(#hub-aura)"/>
      {["M59 37 Q128 33 151 113","M270 32 Q225 39 214 110","M326 128H235","M260 222 Q211 219 207 150","M53 200 Q122 203 151 145"].map((d,i)=><g key={d}><path d={d} stroke="#214b65" strokeOpacity=".18" strokeWidth="1.5"/><motion.path d={d} stroke={i%2?"#279eae":"#f7a11a"} strokeWidth="2" initial={{pathLength:reduce?1:0,opacity:.6}} whileInView={{pathLength:1,opacity:1}} viewport={{once:true,amount:.6}} transition={{duration:reduce?0:1.5,delay:reduce?0:i*.12,ease:"easeInOut"}}/></g>)}
      {positions.map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="5" fill={i%2?"#1b8799":"#f5a214"}/><circle cx={x} cy={y} r="10" stroke="#27657a" strokeOpacity=".15"/></g>)}
    </svg>
    {labels.map((label,i)=><span key={label} className={styles.hubLabel} style={{left:positions[i][0]/3.8+"%",top:positions[i][1]/2.6+"%"}}>{label}</span>)}
    <motion.div className={styles.hubLogo} initial={{scale:reduce?1:.94}} whileInView={{scale:1}} viewport={{once:true,amount:.8}} transition={{duration:reduce?0:1.1,delay:reduce?0:.7}}><Logo className="!h-auto !w-full"/></motion.div>
  </div>;
}
