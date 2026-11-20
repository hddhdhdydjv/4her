# Fogline · prototipo en código

Landing de Fogline (challenge UI Litebox) montada sobre la base de 4HER: Next 16, Tailwind 4 y Lenis.
Ruta: `/fogline`. Todo lo de Fogline vive en `src/fogline/`, `src/app/fogline/` y `public/fogline/`,
así se puede mudar a otro repo sin tocar el sitio de 4HER.

## Estructura (igual que los componentes de Figma)
- `components/hero.tsx`: Sección · Hero. Sticky con 6 pasos de scroll, mockup, card de vidrio e indicadores.
- `components/sections.tsx`: NavPill (CTA · píldora), Clientes, Features, Métricas, Testimonios y Footer.
- `content.ts`: todo el copy.
- `fogline.css`: tokens (colores, sombras, curvas) y estilos.

## Movimiento (igual que las notas del prototipo)
| Movimiento | Curva | Duración |
|---|---|---|
| Hero, pasos 1 → 5 | ease in-out | 600 ms |
| Paso 5 → 6 (el paisaje se disuelve) | ease in-out | 800 ms |
| Entrada de secciones (`Reveal` de 4HER) | ease out | 800 ms |
| Hover | ease out | 150 ms |

El anillo del indicador activo se llena con el scroll dentro del paso.
