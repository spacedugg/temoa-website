import { Kopfzeile } from "@/components/takt/Kopfzeile";
import { Fusszeile } from "@/components/takt/Fusszeile";
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
      <main id="inhalt">
        <Auftrag />
        <Kundenband />
        <Befund />
        {/* Die fuenf Leistungen standen an fuenfter Stelle und gingen unter.
            Jetzt kommen sie direkt nach der Ausgangslage: erst das Problem,
            dann was wir abdecken, dann wie wir vorgehen, dann der Nachweis. */}
        <Leistungen />
        <Verfahren />
        <Nachweis />
        <Arbeiten />
        <Stimmen />
        <Termin />
        <Mannschaft />
        <Wissen posts={featured} />
      </main>
      <Fusszeile />
    </>
  );
}
