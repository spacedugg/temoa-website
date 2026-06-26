import { Ambient } from "../ui/Ambient";

export function ComingSoon({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[72vh] items-center bg-white pt-36 pb-24">
      <Ambient />
      <div className="container-x text-center">
        <span className="eyebrow justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-balance text-base leading-relaxed text-ink-muted">
          {sub ?? "Diese Seite bauen wir gerade. Die Inhalte folgen in Kürze."}
        </p>
        <div className="mt-8 flex justify-center">
          <a href="/" className="btn-ghost">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </section>
  );
}
