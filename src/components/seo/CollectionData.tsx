import { SEITE } from "@/lib/seite";
import { pfad, type Sprache } from "@/lib/i18n";
import type { PostMeta } from "@/lib/blog";

export function CollectionData({ sprache, path, title, description, posts }: {
  sprache: Sprache; path: string; title: string; description: string; posts: PostMeta[];
}) {
  const url = `${SEITE.url}${pfad(sprache, path)}`;
  const data = [
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": url,
      url, name: title, description, inLanguage: sprache,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem", position: index + 1, name: post.title,
          url: `${SEITE.url}${pfad(sprache, `/blog/${post.slug}`)}`,
        })),
      },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: path === "/blog"
        ? [{ "@type": "ListItem", position: 1, name: title, item: url }]
        : [
            { "@type": "ListItem", position: 1, name: "Blog", item: `${SEITE.url}${pfad(sprache, "/blog")}` },
            { "@type": "ListItem", position: 2, name: title, item: url },
          ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
