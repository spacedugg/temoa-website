import { permanentRedirect } from "next/navigation";
import { istSprache, pfad } from "@/lib/i18n";

/** Existing preview links lead to the normal, topic-sorted blog index. */
export default async function FormerCollection({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  permanentRedirect(pfad(istSprache(locale) ? locale : "de", "/blog"));
}
