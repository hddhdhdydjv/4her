import { cx } from "@/utils/cx";

/**
 * Slot de imagen. Mientras no haya `src`, muestra un placeholder gris con
 * la relación de aspecto que le pases por className (ej. "aspect-[4/3]").
 * Para usar una imagen real: subí el archivo a /public/images y pasá
 * src="/images/tu-foto.jpg". Reemplazar el archivo alcanza, no toca código.
 */
export function Media({
    src,
    alt = "",
    className,
    rounded = "rounded-3xl",
    label = "Imagen",
}: {
    src?: string;
    alt?: string;
    className?: string;
    rounded?: string;
    label?: string;
}) {
    return (
        <div className={cx("relative overflow-hidden bg-[var(--brand-surface)]", rounded, className)}>
            {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--brand-muted)] uppercase">
                        {label}
                    </span>
                </div>
            )}
        </div>
    );
}
