"use client";
import { useId, useState, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Logo } from "../Logo";
import Image from "next/image";
import type { Sprache } from "@/lib/i18n";
import { SERVICE_LISTING_IMAGES } from "@/lib/service-listing-images";
import styles from "./ServiceVisual.module.css";

const CTR_PATH = "M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16";
const CONVERSION_PATH = "M12 149 C60 144 80 137 112 141 S166 118 198 121 S245 98 270 99 S315 70 345 56";
const TACOS_PATH = "M12 42 C50 39 65 62 99 59 S157 80 180 76 S222 102 251 100 S303 131 345 138";

function PerformanceGraph({ de }: { de: boolean }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  // Observe the whole HTML chart, never the individual SVG path bounds.
  // Complete base paths render on the server and stay visible without animation.
  const moving = inView && !reduce && !paused;
  const drift = (path: string, alternate: string) => ({
    animate: { d: moving ? [alternate, path, alternate] : path },
    transition: moving ? { duration: 6, repeat: Infinity, ease: "easeInOut" as const } : { duration: 0 },
  });
  return <>
    <div ref={ref} className={styles.graph}>
      <svg viewBox="0 0 360 160" className={styles.graphSvg} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={id+"fill"} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#40edc3" stopOpacity=".28"/><stop offset="1" stopColor="#40edc3" stopOpacity="0"/></linearGradient>
          <radialGradient id={id+"burst"}><stop stopColor="#54ffd9" stopOpacity=".65"/><stop offset=".35" stopColor="#12c7fa" stopOpacity=".25"/><stop offset="1" stopColor="#663df4" stopOpacity="0"/></radialGradient>
          <filter id={id+"glow"} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        {[38,76,114,152].map(y=><path key={y} d={`M12 ${y} H350`} stroke="white" strokeOpacity=".07"/>)}
        {[56,112,168,224,280,336].map(x=><path key={x} d={`M${x} 20 V152`} stroke="white" strokeOpacity=".04"/>)}
        <ellipse cx="308" cy="42" rx="85" ry="68" fill={`url(#${id}burst)`}/>
        <path d={CTR_PATH+" V154 H12 Z"} fill={`url(#${id}fill)`}/>
        <motion.path {...drift(CTR_PATH,"M12 145 C55 146 62 133 96 138 S145 118 172 122 S217 96 238 98 S270 82 285 75 S310 54 345 34")} d={CTR_PATH} stroke="#49f4c6" strokeWidth="7" opacity=".3" filter={`url(#${id}glow)`}/>
        <motion.path {...drift(CTR_PATH,"M12 145 C55 146 62 133 96 138 S145 118 172 122 S217 96 238 98 S270 82 285 75 S310 54 345 34")} d={CTR_PATH} stroke="#49f4c6" strokeWidth="2.8" strokeLinecap="round"/>
        <motion.path {...drift(CONVERSION_PATH,"M12 151 C60 148 80 145 112 149 S166 129 198 132 S245 112 270 113 S315 86 345 72")} d={CONVERSION_PATH} stroke="#4ebcff" strokeWidth="2" strokeLinecap="round"/>
        <motion.path {...drift(TACOS_PATH,"M12 42 C50 39 65 56 99 53 S157 68 180 64 S222 84 251 82 S303 114 345 121")} d={TACOS_PATH} stroke="#ffad68" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 4"/>
      </svg>
    </div>
    <button type="button" className={`${styles.pause} ${styles.graphPause}`} aria-pressed={paused} onClick={()=>setPaused(p=>!p)} aria-label={paused?(de?"Diagrammanimation fortsetzen":"Resume chart animation"):(de?"Diagrammanimation pausieren":"Pause chart animation")}>{paused?"▶":"Ⅱ"}</button>
  </>;
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
        <PerformanceGraph de={de}/>
      </>}
      {index===2 && <SupportTicket de={de}/>}
      {index===3 && <Image src="/bilder/services/international-orbit-v2.webp" alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover"/>}
      {index===4 && <>
        <Image src="/bilder/services/strategy-deal-v2.webp" alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover"/>
        <div className={styles.offerBadge} aria-hidden="true">{de?"Deal-Planung":"Deal planning"}</div>
        <div className={styles.offerCopy} aria-hidden="true"><strong>{de?"Angebote mit Strategie.":"Offers with a strategy."}</strong><span>{de?"Preis. Marge. Timing.":"Price. Margin. Timing."}</span><div><i/><i/><i/></div></div>
      </>}
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
