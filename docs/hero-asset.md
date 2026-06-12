# 3D-Assets „Produktbühne“ (Entwurf F)

**Stand:** 12.06.2026 · Alle fotorealistischen 3D-Assets werden mit Higgsfield
generiert (Modell `marketing_studio_image`, konsistentes Licht-System: helles
Studio bzw. Navy-Bühne, Orange/Rot-Rim-Light). Jeder Slot hat einen
CSS-Fallback — fehlt das File, rendert die Seite trotzdem sauber.

## Slots & Einbau

| Slot | Datei (`public/assets/img/3d/`) | Einsatzort |
|---|---|---|
| `hero-stage` | `hero-stage.webp` | Hero, rechte Bühne (21:9) |
| `stage-steps` | `stage-steps.webp` | Organic-First-Sektion, Hintergrund (16:9) |
| `shape-square` | `shape-square.webp` | Leistungs-Kachel „Strategy Suite“ (1:1) |
| `shape-circle` | `shape-circle.webp` | Leistungs-Kachel „Content Studio“ (1:1) |
| `shape-u` | `shape-u.webp` | Leistungs-Kachel „Advertising Engine“ (1:1) |
| `shape-hexagon` | `shape-hexagon.webp` | Leistungs-Kachel „Management Hub“ (1:1) |

Einchecken (sobald `d8j0ntlcm91z4.cloudfront.net` in den
Netzwerk-Einstellungen der Claude-Code-Umgebung freigegeben ist):

```
node scripts/fetch-asset.mjs <rawUrl> <slot>
```

## Generierte Kandidaten (Higgsfield-Jobs, 12.06.2026)

| Slot | Job-ID | rawUrl |
|---|---|---|
| hero-stage (Kandidat 1) | `be6c2463-ab54-407f-8ccc-67ec0fe25820` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_be6c2463-ab54-407f-8ccc-67ec0fe25820.png |
| hero-stage (Kandidat 2) | `f0515e14-a575-482f-8ba3-43f799a025e0` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_131206_f0515e14-a575-482f-8ba3-43f799a025e0.png |
| stage-steps (Kandidat 1) | `d0b86aa5-b989-48f5-b560-e2f84887f6eb` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_160231_d0b86aa5-b989-48f5-b560-e2f84887f6eb.png |
| stage-steps (Kandidat 2) | `52ad0566-74f3-45c3-838c-7b22bca46ac8` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_160231_52ad0566-74f3-45c3-838c-7b22bca46ac8.png |
| shape-square | `4ffc388a-9d86-4c99-b9fb-d77c6b0c3bdc` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_160234_4ffc388a-9d86-4c99-b9fb-d77c6b0c3bdc.png |
| shape-circle | `05b2e279-1d2f-4136-b0b7-5d9afee0a4d6` | https://d8j0ntlcm91z4.cloudfront.net/user_3DdOfLdos9u5TsU7z0EKzCBZQtV/hf_20260612_160236_05b2e279-1d2f-4136-b0b7-5d9afee0a4d6.png |
| shape-u | `70f6e15a-d69a-4240-a723-93e4d52e3d2d` | *(rendert — rawUrl via `job_display` abrufen)* |
| shape-hexagon | `245a2e17-f3f8-4825-ba20-0ba504b9fd35` | *(rendert — rawUrl via `job_display` abrufen)* |

Hero-Bild wird neu generiert, sobald echte TEMOA-Produktbilder als Referenz
hochgeladen sind (Higgsfield-Upload-Widget). Zwei frühere dunkle
Hero-Varianten (`d8335bc7…`/`5413ef56…`) sind verworfen.
