#!/usr/bin/env node
/* ============================================================
   Die Listing-Videos der Fallseiten kleiner rechnen.

     node scripts/videos-rechnen.mjs

   Braucht ffmpeg. In dieser Umgebung ist es nicht vorinstalliert:
   `apt-get update && apt-get install -y ffmpeg`.

   Die Videos haengen an `preload="none"` und einem Standbild, sie werden also
   erst geladen, wenn jemand auf Abspielen drueckt. Fuer die Ladezeit der Seite
   zaehlen sie nicht; fuer den, der sie abspielt, sind vier Megabyte trotzdem
   vier Megabyte.

   Die gelieferten Dateien sind bereits gerechnet: 1280 mal 720 in H.264 mit
   840 beziehungsweise 607 kbit/s. Dort ist mit H.264 nichts mehr zu holen, ein
   zweiter Durchgang wurde Byte fuer Byte gleich gross. Gemessen wurde deshalb,
   statt zu raten:

     AV1 CRF 36  1,8 MB     H.264 auf 960 gerechnet  1,7 MB
     AV1 CRF 40  1,5 MB     Ausgangsdatei            1,9 MB
     AV1 CRF 44  1,2 MB

   Gewaehlt ist AV1 bei CRF 40: rund ein Viertel weniger, ohne dass an der
   Aufloesung etwas abgeht. Die H.264-Datei bleibt daneben liegen und dient als
   Rueckfall, wo AV1 fehlt (Safari vor 17, aeltere Android-Geraete). Der Browser
   nimmt die erste Quelle, die er abspielen kann.

   Die Masse bleiben bei 1280 Pixeln. Das Video steht in einer Spalte von rund
   470 Pixeln, `controls` erlaubt aber das Vollbild, und ein auf 960 gerechnetes
   Video sieht dort weich aus.

   `+faststart` schiebt den Index an den Anfang der Datei, sonst beginnt die
   Wiedergabe erst nach dem vollstaendigen Laden.
   ============================================================ */

import { execFileSync } from "node:child_process";
import { statSync, existsSync, unlinkSync } from "node:fs";
import { dirname, basename, join } from "node:path";

const VIDEOS = [
  "public/case_studies/futum/p3-video.mp4",
  "public/case_studies/haa/p1-video.mp4",
];

/* CRF 40, siehe Messung oben. Bei 30 wurde die Datei groesser als die Quelle:
   der Encoder zielt dann auf eine Qualitaet, die in der Vorlage gar nicht mehr
   steckt, und schreibt die Artefakte der ersten Kompression sauber mit. */
const AV1 = ["-c:v", "libsvtav1", "-crf", "40", "-preset", "6", "-g", "240", "-pix_fmt", "yuv420p"];
const TON = ["-c:a", "aac", "-b:a", "96k", "-ac", "2"];

function kb(n) {
  return (n / 1048576).toFixed(2) + " MB";
}

function rechnen(quelle, ziel, optionen) {
  execFileSync(
    "ffmpeg",
    ["-y", "-hide_banner", "-loglevel", "error", "-i", quelle, ...optionen, ...TON, "-movflags", "+faststart", ziel],
    { stdio: "inherit" }
  );
}

for (const pfad of VIDEOS) {
  if (!existsSync(pfad)) {
    console.log("fehlt:", pfad);
    continue;
  }
  const alt = statSync(pfad).size;
  const stamm = join(dirname(pfad), basename(pfad, ".mp4"));

  const av1 = `${stamm}-av1.mp4`;
  rechnen(pfad, av1, AV1);
  const neu = statSync(av1).size;

  /* Groesser als die Vorlage heisst: hier ist nichts zu holen. Dann bleibt es
     bei der einen Datei, statt zwei auszuliefern, von denen die neue die
     schlechtere ist. */
  if (neu >= alt) {
    unlinkSync(av1);
    console.log(`${pfad}\n  AV1 waere groesser als die Vorlage (${kb(neu)} gegen ${kb(alt)}), verworfen.`);
    continue;
  }
  console.log(`${pfad}\n  H.264 ${kb(alt)}\n  AV1   ${kb(neu)}  (${Math.round((1 - neu / alt) * 100)} % weniger)`);
}
