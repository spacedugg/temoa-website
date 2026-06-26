"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Ambient } from "../ui/Ambient";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { PostCard } from "../blog/PostCard";
import type { PostMeta } from "@/lib/blog";

export function BlogStrip({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="relative isolate border-t border-black/[0.05] bg-white py-20 md:py-24">
      <Ambient />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Blog"
            size="compact"
            className="md:mx-0"
            title={
              <>
                Klartext zu <span className="text-gradient">Amazon.</span>
              </>
            }
          />
          <a href="/blog" className="btn-ghost shrink-0">
            Alle Beiträge
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {posts.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <PostCard post={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
