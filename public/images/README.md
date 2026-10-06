# Imágenes del sitio

Cada imagen se sube con el nombre de la tabla, **en cualquiera de estas
extensiones**: `webp`, `avif`, `png`, `jpg`, `jpeg` o `svg`. No hace falta
tocar código: mientras el archivo no está, el sitio muestra un placeholder con
la ruta esperada; apenas el archivo existe, el próximo deploy lo toma.

Los tamaños son a 2x (el doble de lo que ocupan en pantalla) para que se vean
nítidas en pantallas densas. No hace falta optimizarlas: Next las sirve
recortadas y en AVIF/WebP según la pantalla de cada visitante.

## Obligatorias

| Archivo | Dónde va | Tamaño sugerido | Notas |
| --- | --- | --- | --- |
| `hero/hero.png` | Hero, mitad derecha | 1800 × 1600 | Fondo transparente o el mismo verde del hero (`#EBF2F2`). Se recorta para llenar la caja, así que dejá aire alrededor del objeto. |
| `services/posicionamiento.webp` | Servicio 01 | 1216 × 884 | Proporción 11:8. |
| `services/marketing.webp` | Servicio 02 | 1216 × 884 | Proporción 11:8. |
| `services/estrategia.webp` | Servicio 03 | 1216 × 884 | Proporción 11:8. |
| `services/sello-verde.webp` | Servicio 04 | 1216 × 884 | Proporción 11:8. |

## Opcionales

| Archivo | Dónde va | Tamaño sugerido | Notas |
| --- | --- | --- | --- |
| `wepiper/wepiper.webp` | Caso WePiper | 2560 × 1440 | La composición completa del caso, proporción 16:9. |

## Lo que no lleva imagen

- **Footer:** el "4her" gigante de fondo es el logotipo vectorial de la marca,
  dibujado en código. Queda nítido a cualquier ancho y no suma descarga.
