# Capas del hero

El hero (`src/components/sections/hero.tsx`) espera dos PNG acá. Salen del
frame de Figma `Hero` (2205:2951), dentro del grupo `Background shapes`:

| Archivo           | Capa en Figma          | Qué es                       | Plano        |
| ----------------- | ---------------------- | ---------------------------- | ------------ |
| `hero-back.png`   | `Shape 3` (2205:2953)  | cielo + montañas lejanas     | fondo        |
| `hero-front.png`  | `Shape 1` (2205:2955)  | lomas verdes del frente      | primer plano |

El logotipo `4her` **no** se exporta: se dibuja por CSS con la tipografía real
(`GlassWordmark` en el mismo archivo), así queda nítido en cualquier tamaño y
el vidrio reacciona al paisaje que tiene detrás.

## Cómo exportarlas

En Figma, seleccionando cada capa por separado:

- **Formato:** PNG (necesitan transparencia, sobre todo `hero-front.png`)
- **Escala:** 2x
- **Ancho final sugerido:** 2560 px (el frame mide 1280 a 1x)
- `hero-front.png` tiene que salir **con fondo transparente** arriba — es lo
  que deja ver el logotipo y el cielo por detrás.

## Mientras no estén

El hero usa un degradado de atardecer (`SCENE_FALLBACK`) y las capas se ocultan
solas si el PNG no resuelve. No hace falta tocar código: apenas los archivos
caen acá con estos nombres, el parallax los toma.

## Parallax

Cada plano se rezaga distinto al hacer scroll (`useParallax`, en
`src/hooks/use-parallax.ts`):

- fondo `0.42` — casi no se mueve, se lee como lejano
- logotipo `0.24` — intermedio
- primer plano `-0.06` — se adelanta apenas, pasa "cerca" de la cámara

Se apaga solo con `prefers-reduced-motion: reduce`.
