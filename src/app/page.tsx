import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { TaktLine } from "@/components/takt/TaktLine";
import { Auftrag } from "@/components/takt/Auftrag";
import { Ablauf } from "@/components/takt/Ablauf";
import {
  Kundenband,
  Befund,
  Verfahren,
  Leistungen,
  Nachweis,
  Arbeiten,
  Stimmen,
  Termin,
  Mannschaft,
  Wissen,
} from "@/components/takt/sections";
import { getFeaturedPosts } from "@/lib/blog";

export default function Home() {
  const featured = getFeaturedPosts(4);
  return (
    <>
      <Kopfzeile />
      <TaktLine>
        <main id="inhalt">
          <Auftrag />
          <Kundenband />
          <Befund />
          <Verfahren />
          <Leistungen />
          <Nachweis />
          <Arbeiten />
          <Stimmen />
          <Ablauf n="07" />
          <Termin n="08" />
          <Mannschaft n="09" />
          <Wissen posts={featured} n="10" />
        </main>
      </TaktLine>
      <Fusszeile />
    </>
  );
}
