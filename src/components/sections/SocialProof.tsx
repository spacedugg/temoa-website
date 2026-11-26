import { KundenlogoMarquee } from "../ui/KundenlogoMarquee";

export function ProofStrip({ logoAlt }: { logoAlt: string }) {
  return (
    <section className="ground-tint relative py-12 md:py-14">
      <div className="container-x">
        <KundenlogoMarquee logoAlt={logoAlt} />
      </div>
    </section>
  );
}
