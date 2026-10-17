"use client";

import { useState } from "react";
import type { Kategorie, PostMeta } from "@/lib/blog";
import type { Sprache } from "@/lib/i18n";
import type { Woerterbuch } from "@/lib/woerter";
import { PostCard } from "./PostCard";

export function BlogArticleDirectory({
  posts,
  categories,
  sprache,
  w,
}: {
  posts: PostMeta[];
  categories: Kategorie[];
  sprache: Sprache;
  w: Woerterbuch["blog"];
}) {
  const [selected, setSelected] = useState("alle");
  const visible = selected === "alle" ? posts : posts.filter((post) => post.categorySlug === selected);
  const count = (n: number) => n === 1 ? w.einBeitrag : w.beitraege.replace("{n}", String(n));
  const allLabel = sprache === "de" ? "Alle" : "All";
  const heading = selected === "alle"
    ? sprache === "de" ? "Alle Artikel" : "All articles"
    : categories.find((category) => category.slug === selected)?.label ?? allLabel;

  return (
    <section className="ground-tint py-14 md:py-20" aria-labelledby="blog-artikel-titel">
      <div className="container-x">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label font-bold uppercase tracking-[0.12em] text-ink-muted">
              {sprache === "de" ? "Nach Thema entdecken" : "Explore by topic"}
            </p>
            <h2 id="blog-artikel-titel" aria-live="polite" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {heading}
            </h2>
          </div>
          <p className="text-small text-ink-muted" aria-live="polite">{count(visible.length)}</p>
        </div>

        <div className="-mx-1 mt-7 overflow-x-auto px-1 pb-2" role="group" aria-label={sprache === "de" ? "Beiträge nach Thema filtern" : "Filter articles by topic"}>
          <div className="flex w-max min-w-full gap-2 sm:w-full sm:flex-wrap">
            {[{ slug: "alle", label: allLabel }, ...categories.map(({ slug, label }) => ({ slug, label }))].map((category) => {
              const active = selected === category.slug;
              const total = category.slug === "alle" ? posts.length : posts.filter((post) => post.categorySlug === category.slug).length;
              return (
                <button
                  key={category.slug}
                  type="button"
                  aria-pressed={active}
                  aria-controls="blog-artikel-liste"
                  onClick={() => setSelected(category.slug)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${active ? "border-navy bg-navy text-white" : "border-ink/15 bg-white text-ink-muted hover:border-navy hover:text-navy"}`}
                >
                  {category.label}
                  <span className={active ? "text-white/70" : "text-ink-faint"}>{total}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="blog-artikel-liste" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} sprache={sprache} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
