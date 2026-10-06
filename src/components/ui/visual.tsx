import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cx } from "@/utils/cx";

/**
 * Hueco para una imagen del diseño que todavía puede no estar subida.
 *
 * Se resuelve en el servidor: si en `public/` hay un archivo con ese nombre
 * (en cualquiera de las extensiones de abajo) se muestra la imagen; si no, un
 * placeholder que dice qué archivo falta y de qué tamaño. Así no hace falta
 * tocar código cuando llegan las imágenes: se suben con el nombre que indica
 * el placeholder y el próximo deploy las toma.
 *
 * Que sea del servidor y no un `onError` en el cliente importa por dos cosas:
 * no hay pedidos 404 ni un parpadeo de imagen rota, y una imagen con
 * transparencia (el objeto del hero) no deja ver el placeholder por debajo.
 *
 * Ocupa toda su caja (`fill`): el que lo usa decide tamaño y proporción.
 */

const EXTENSIONS = ["webp", "avif", "png", "jpg", "jpeg", "svg"];

/** Archivo de `public/` que corresponde a `name` en alguna extensión, o null. */
export function resolvePublic(name: string, extensions: string[] = EXTENSIONS) {
    for (const ext of extensions) {
        const file = `${name}.${ext}`;
        if (fs.existsSync(path.join(process.cwd(), "public", file))) return file;
    }
    return null;
}

export function Visual({
    name,
    alt,
    sizes,
    spec,
    priority = false,
    fit = "cover",
    className,
    placeholderClassName,
}: {
    /** Ruta dentro de `public/`, sin extensión. Ej: `/images/servicios/posicionamiento`. */
    name: string;
    alt: string;
    sizes: string;
    /** Tamaño y formato sugeridos, para el placeholder. */
    spec: string;
    priority?: boolean;
    fit?: "cover" | "contain";
    className?: string;
    placeholderClassName?: string;
}) {
    const src = resolvePublic(name);

    if (src) {
        return (
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                // next/image no optimiza SVG: se sirve tal cual.
                unoptimized={src.endsWith(".svg")}
                className={cx(fit === "cover" ? "object-cover" : "object-contain", className)}
            />
        );
    }

    return (
        <div
            role="img"
            aria-label={`${alt} (imagen pendiente)`}
            className={cx(
                "absolute inset-0 flex items-center justify-center p-4",
                "bg-[var(--neutral-100)]",
                placeholderClassName,
            )}
        >
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-black/15 px-4 text-center">
                <span className="font-body text-[0.8125rem] font-medium tracking-[0.06em] text-[var(--text-tertiary)] uppercase">
                    Imagen pendiente
                </span>
                <span className="font-mono text-[0.75rem] break-all text-[var(--text-secondary)]">
                    public{name}.(webp|png|jpg)
                </span>
                <span className="font-body text-[0.75rem] text-[var(--text-tertiary)]">{spec}</span>
            </div>
        </div>
    );
}
