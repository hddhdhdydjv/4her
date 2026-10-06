# Imágenes del sitio

Cada imagen se sube con el nombre de la tabla, **en cualquiera de estas
extensiones**: `webp`, `avif`, `png`, `jpg`, `jpeg` o `svg`. No hace falta
tocar código: mientras el archivo no está, el sitio muestra un placeholder con
la ruta esperada; apenas el archivo existe, el próximo deploy lo toma.

El video del hero es la excepción: sólo acepta `mp4` y `webm`.

Los tamaños son a 2x (el doble de lo que ocupan en pantalla) para que se vean
nítidas en pantallas densas. No hace falta optimizarlas: Next las sirve
recortadas y en AVIF/WebP según la pantalla de cada visitante.

## Obligatorias

| Archivo | Dónde va | Tamaño sugerido | Notas |
| --- | --- | --- | --- |
| `hero/hero-video.mp4` | Hero **desktop**, de fondo detrás de la tipografía | 1920 × 1080 | MP4 (H.264), sin audio, loop de 10 a 20 s, idealmente menos de 8 MB. Mobile no lo descarga. |
| `hero/hero.png` | Hero **mobile**, debajo del texto | 1800 × 1600 | Fondo transparente o el mismo verde del hero (`#EBF2F2`). En mobile se ve entera, sin recortar. |
| `services/posicionamiento.webp` | Servicio 01 | 1216 × 884 | Proporción 11:8. |
| `services/marketing.webp` | Servicio 02 | 1216 × 884 | Proporción 11:8. |
| `services/estrategia.webp` | Servicio 03 | 1216 × 884 | Proporción 11:8. |
| `services/sello-verde.webp` | Servicio 04 | 1216 × 884 | Proporción 11:8. |

## Opcionales

| Archivo | Dónde va | Tamaño sugerido | Notas |
| --- | --- | --- | --- |
| `hero/hero-video.webm` | Mismo video, en WebM | 1920 × 1080 | Los navegadores que lo soportan lo prefieren y pesa menos. Si no lo subís, usan el MP4. |
| `hero/hero-poster.webp` | Primer cuadro del video | 1920 × 1080 | Se ve mientras el video carga, y siempre para quien tiene activado reducir movimiento. |
| `wepiper/wepiper.webp` | Caso WePiper, desktop y tablet | 2560 × 1440 | La composición completa del caso, horizontal 16:9. |
| `wepiper/wepiper-mobile.webp` | Caso WePiper, celular | 1200 × 1500 | La misma composición rearmada vertical, 4:5. Si no la subís, el celular usa la horizontal, más chica. |

## Lo que no lleva imagen

- **Footer:** el "4her" gigante de fondo es el logotipo vectorial de la marca,
  dibujado en código. Queda nítido a cualquier ancho y no suma descarga.
