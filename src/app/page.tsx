import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
import { TaktLine } from "@/components/takt/TaktLine";
import { Auftrag } from "@/components/takt/Auftrag";
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
          <Termin />
          <Mannschaft />
          <Wissen posts={featured} />
        </main>
      </TaktLine>
      <Fusszeile />
    </>
  );
}
