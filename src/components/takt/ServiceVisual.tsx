"use client";
import { useId, useState } from "react";
import Image from "next/image";
import type { Sprache } from "@/lib/i18n";
import { SERVICE_LISTING_IMAGES } from "@/lib/service-listing-images";
import styles from "./ServiceVisual.module.css";

const CTR_PATH = "M12 140 C55 141 62 115 96 120 S145 100 172 104 S217 78 238 80 S270 64 285 57 S310 36 345 16";
const CONVERSION_PATH = "M12 149 C60 144 80 137 112 141 S166 118 198 121 S245 98 270 99 S315 70 345 56";
const TACOS_PATH = "M12 42 C50 39 65 62 99 59 S157 80 180 76 S222 102 251 100 S303 131 345 138";

function PerformanceGraph() {
  const id = useId();
  return (
    <div className={styles.graph}>
      <svg viewBox="0 0 368 166" className={styles.graphSvg} fill="none" aria-hidden="true">
        <defs>
          <radialGradient id={id}>
            <stop stopColor="#49f4c6" stopOpacity=".26" />
            <stop offset=".45" stopColor="#49f4c6" stopOpacity=".09" />
            <stop offset="1" stopColor="#49f4c6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[38, 76, 114, 152].map(y => <path key={y} d={`M12 ${y} H350`} stroke="white" strokeOpacity=".07" />)}
        {[56, 112, 168, 224, 280, 336].map(x => <path key={x} d={`M${x} 20 V152`} stroke="white" strokeOpacity=".04" />)}
        <ellipse cx="330" cy="27" rx="36" ry="25" fill={`url(#${id})`} />
        <g strokeLinecap="round">
          <path d={CTR_PATH} stroke="#49f4c6" strokeWidth="2.8" />
          <path d={CONVERSION_PATH} stroke="#4ebcff" strokeWidth="2" />
          <path d={TACOS_PATH} stroke="#ffad68" strokeWidth="2" strokeDasharray="5 4" />
        </g>
      </svg>
    </div>
  );
}

// Change playback rate in place so entering or leaving never jumps to another image.
function setPreviewSpeed(preview: HTMLElement, rate: number) {
  for (const track of preview.querySelectorAll<HTMLElement>(`.${styles.track}`)) {
    for (const animation of track.getAnimations()) animation.updatePlaybackRate(rate);
  }
}

export function ServiceVisual({ index, sprache }: { index: number; sprache: Sprache }) {
  const de = sprache === "de";
  const [paused, setPaused] = useState(false);
  if (index === 1) return (
    <div
      className={`${styles.listingWindow} ${paused ? styles.paused : ""}`}
      onPointerEnter={event => {
        if (event.pointerType !== "touch") setPreviewSpeed(event.currentTarget, 0.8);
      }}
      onPointerLeave={event => setPreviewSpeed(event.currentTarget, 1)}
      role="group"
      aria-label={de ? "Gemischte Listingbilder aus unseren Designbeispielen" : "Mixed listing images from our design examples"}>
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
      de?"Sortimentsstrategie: Kaffeefilter und Kanne als Einzelprodukte und zusammen als Starterset":"Assortment strategy: a coffee dripper and carafe sold individually and together as a starter set",
    ][index]}>
      {index === 2 && <span className={styles.ambient} aria-hidden="true" />}
      {index===0 && <>
        <div className={styles.legend}><span className={styles.green}>↗ CTR</span><span className={styles.blue}>↗ Conversion</span><span className={styles.orange}>↘ TACoS</span></div>
        <PerformanceGraph />
      </>}
      {index===2 && <SupportTicket de={de}/>}
      {index===3 && <Image src="/bilder/services/market-cutout.webp" alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className={styles.marketMap}/>}
      {index === 4 && (
        <div className={styles.bundlePlan} aria-hidden="true">
          <div className={styles.bundleArt}>
            <Image src="/bilder/services/assortment-bundle.webp" alt="" fill sizes="(min-width: 400px) 360px, 90vw" />
          </div>
          <div className={styles.bundleLabels}>
            <span>{de ? "Einzelprodukte" : "Individual products"}</span>
            <span className={styles.bundleArrow}>→</span>
            <strong>{de ? "Starterset" : "Starter set"}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

function SupportTicket({ de }: { de: boolean }) {
  return <div className={styles.ticket} aria-hidden="true">
    <div className={styles.ticketHeader}><span className={styles.ticketIcon}>↗</span><div><strong>Amazon Seller Support</strong><small>{de?"Katalog & Listing":"Catalog & listing"}</small></div><span className={styles.resolved}>✓ {de?"Gelöst":"Resolved"}</span></div>
    <div className={styles.message}><span className={styles.avatar}>t</span><div><b>temoa</b><p>{de?"Bitte die Produktvariante korrekt zuordnen.":"Please correct the product variation."}</p></div></div>
    <div className={styles.reply}><span>✓</span><div><b>Amazon Support</b><p>{de?"Die Zuordnung wurde korrigiert.":"The variation has been corrected."}</p></div></div>
    <div className={styles.ticketFooter}><span className={styles.green}>● {de?"Listing aktualisiert":"Listing updated"}</span><span>temoa ↔ Amazon</span></div>
  </div>;
}
