import type { PostMeta } from "@/lib/blog";
import { BlogCover } from "./BlogCover";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <a href={`/blog/${post.slug}`} className="surface surface-hover group flex h-full flex-col overflow-hidden">
      <BlogCover
        accent={post.accent}
        icon={post.categoryIcon}
        seed={post.slug}
        label={post.categoryShort}
        image={post.image}
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-ink line-clamp-3 group-hover:text-ink">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-2">{post.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-ink-faint">
          <span>{post.readingMinutes} Min. Lesezeit</span>
          <span className="inline-flex items-center gap-1 font-semibold text-ink-muted transition-colors group-hover:text-ink">
            Lesen
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
