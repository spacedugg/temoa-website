import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

// Temporärer Introspektions-Endpoint, um die Blob-Bibliothek zu sichten.
// Wird nach dem Einbau wieder entfernt.
export async function GET() {
  try {
    const all: { pathname: string; url: string; size: number }[] = [];
    let cursor: string | undefined;
    do {
      const res = await list({ limit: 1000, cursor });
      for (const b of res.blobs) {
        all.push({ pathname: b.pathname, url: b.url, size: b.size });
      }
      cursor = res.hasMore ? res.cursor : undefined;
    } while (cursor);

    // group by top-level folder
    const groups: Record<string, number> = {};
    for (const b of all) {
      const top = b.pathname.includes("/") ? b.pathname.split("/")[0] : "(root)";
      groups[top] = (groups[top] ?? 0) + 1;
    }

    return Response.json({ count: all.length, groups, blobs: all });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : String(e), hasToken: !!process.env.BLOB_READ_WRITE_TOKEN },
      { status: 200 }
    );
  }
}
