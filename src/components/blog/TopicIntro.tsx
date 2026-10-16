import { getTopic, blogTopics } from "@/lib/blog-topics";
import { getPost } from "@/lib/blog";
import { pfad, type Sprache } from "@/lib/i18n";

export function TopicIntro({ slug, sprache }: { slug: string; sprache: Sprache }) {
  const topic = getTopic(slug);
  if (!topic) return null;
  return (
    <section className="ground-tint py-12 md:py-16" aria-labelledby="einstieg">
      <div className="container-x">
        <h2 id="einstieg" className="text-2xl font-extrabold tracking-tight text-ink">
          {sprache === "de" ? "Welche Frage beschäftigt euch?" : "What are you working on?"}
        </h2>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {topic.starts.filter((item) => getPost(item.slug, sprache)).map((item) => (
            <a key={item.slug} href={pfad(sprache, `/blog/${item.slug}`)} className="panel panel-lift flex flex-col p-6">
              <h3 className="text-lg font-bold leading-snug text-ink">{item.question[sprache]}</h3>
              <p className="mb-5 mt-3 text-small text-ink-muted">{item.answer[sprache]}</p>
              <span className="mt-auto text-small font-bold text-navy">{sprache === "de" ? "Zum Ratgeber" : "Read the guide"} <span aria-hidden>↗</span></span>
            </a>
          ))}
        </div>
        <div className="panel mt-6 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <p className="text-small text-ink-muted">{sprache === "de" ? "Ihr möchtet das Thema gemeinsam mit uns angehen?" : "Looking for support putting this into practice?"}</p>
          <a href={pfad(sprache, topic.service)} className="inline-flex min-h-12 items-center font-bold text-navy underline decoration-brand-500 underline-offset-4">{topic.serviceLabel[sprache]} <span aria-hidden className="ml-2">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export function TopicNavigation({ sprache, current }: { sprache: Sprache; current?: string }) {
  return (
    <nav aria-label={sprache === "de" ? "Weitere Amazon-Themen" : "More Amazon topics"} className="ground-tint py-10">
      <div className="container-x flex flex-wrap gap-3">
        {blogTopics.filter((topic) => topic.slug !== current).map((topic) => (
          <a key={topic.slug} href={pfad(sprache, `/blog/kategorie/${topic.slug}`)} className="inline-flex min-h-12 items-center rounded-full border border-navy/15 bg-white px-5 py-2 text-small text-navy hover:border-navy">{topic.label[sprache]}</a>
        ))}
        <a href={pfad(sprache, "/blog/vergleiche")} className="inline-flex min-h-12 items-center rounded-full bg-navy px-5 py-2 text-small text-white">{sprache === "de" ? "Vergleiche & Entscheidungshilfen" : "Comparisons & decision guides"}</a>
      </div>
    </nav>
  );
}
