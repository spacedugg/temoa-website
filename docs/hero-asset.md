# Hero-Asset „Produktbühne“ (Entwurf F)

**Stand:** 12.06.2026 · Das fotorealistische Hero-Bild wird mit Higgsfield
generiert und soll als `public/assets/img/hero-stage.webp` ins Repo. Solange
das File fehlt, rendert `/entwurf-f` automatisch eine CSS-Bühne als Fallback.

## Workflow

1. Echte TEMOA-Produktbilder werden via Higgsfield-Upload-Widget
   bereitgestellt und als Referenz in die Bühnen-Szene gesetzt
   (Modell `marketing_studio_image`, 21:9, helles Studio, Orange/Rot-Rim-Light,
   schwebende Glas-Dashboards).
2. Download in den Container erfordert die Freigabe des Hosts
   `d8j0ntlcm91z4.cloudfront.net` in den Netzwerk-Einstellungen der
   Claude-Code-Umgebung (vom Nutzer zugesagt). Danach:

   ```
   node scripts/fetch-hero.mjs <rawUrl>
   ```

## Bisherige Kandidaten (generisches Produkt, helle Studio-Bühne, 21:9, 2K)

| Kandidat | Higgsfield-Job | rawUrl |
|---|---|---|
| 1 | `be6c2463-ab54-407f-8ccc-67ec0fe25820` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png |
| 2 | `f0515e14-a575-482f-8ba3-43f799a025e0` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_f0515e14-a575-482f-8ba3-43f799a025e0.png |

Diese werden ersetzt, sobald Varianten mit echten Produktbildern vorliegen.
(Zwei frühere, dunkle Varianten `d8335bc7…`/`5413ef56…` sind verworfen —
das abgestimmte Konzept ist die helle Bühne.)
