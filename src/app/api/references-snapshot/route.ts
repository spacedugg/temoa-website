import { NextResponse } from "next/server";
import { getReferencesRaw } from "@/lib/references";

/* Einmal-Export der Design-Beispiele als references.json.
 *
 * Solange TURSO_DATABASE_URL + TURSO_AUTH_TOKEN in Vercel gesetzt sind,
 * liefert dieser Endpunkt den kompletten Stand aus der Sales-Room-DB als
 * herunterladbare Datei. Diese Datei nach src/data/references.json legen,
 * danach liest die Website nur noch den statischen Snapshot und die
 * Turso-Variablen können entfernt werden.
 *
 * Aufruf: /api/references-snapshot
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const { data, diag } = await getReferencesRaw();
  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": 'attachment; filename="references.json"',
      "x-snapshot-source": diag.source,
      "x-snapshot-listings": String(diag.listingCount),
    },
  });
}
