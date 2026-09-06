import { EntwurfEins, EntwurfZwei, EntwurfDrei } from "@/components/service/KarteEntwuerfe";

/* Nur zur Ansicht der Entwuerfe. Diese Seite wird nach der Entscheidung
   wieder geloescht und ist nirgends verlinkt. */
export default function Entwuerfe() {
  return (
    <main className="ground-tint">
      <div className="mx-auto max-w-[560px] px-8 py-10" id="eins">
        <EntwurfEins />
      </div>
      <div className="mx-auto max-w-[560px] px-8 py-10" id="zwei">
        <EntwurfZwei />
      </div>
      <div className="mx-auto max-w-[560px] px-8 py-10" id="drei">
        <EntwurfDrei />
      </div>
    </main>
  );
}
