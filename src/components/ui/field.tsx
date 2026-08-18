import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/utils/cx";

/**
 * Campos de formulario.
 *
 * `dark` los prepara para apoyarse sobre una foto oscura: el relleno pasa a un
 * blanco muy bajo en vez de un color plano, así deja pasar la imagen sin perder
 * el contraste del texto, y el borde deja de ser una línea gris para pasar a un
 * blanco translúcido, que es lo único que se lee parejo sobre un fondo que
 * cambia de tono a lo largo del campo.
 */
const fieldBase =
    "w-full rounded-xl px-4 py-3 text-base ring-1 ring-inset outline-none transition-shadow focus:ring-2";

const fieldLight =
    "bg-[var(--color-bg-primary)] text-primary ring-[var(--color-border-primary)] " +
    "placeholder:text-[var(--color-text-placeholder)] focus:ring-[var(--color-focus-ring)]";

const fieldDark =
    "bg-white/10 text-[var(--neutral-50)] ring-white/25 backdrop-blur-sm " +
    "placeholder:text-white/45 focus:ring-white/70";

export function Label({
    children,
    htmlFor,
    dark = false,
}: {
    children: React.ReactNode;
    htmlFor: string;
    dark?: boolean;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={cx(
                "mb-1.5 block text-sm font-medium",
                dark ? "text-white/70" : "text-secondary",
            )}
        >
            {children}
        </label>
    );
}

export function Input({
    className,
    dark = false,
    ...props
}: ComponentPropsWithoutRef<"input"> & { dark?: boolean }) {
    return <input className={cx(fieldBase, dark ? fieldDark : fieldLight, className)} {...props} />;
}

export function Textarea({
    className,
    dark = false,
    ...props
}: ComponentPropsWithoutRef<"textarea"> & { dark?: boolean }) {
    return (
        <textarea
            className={cx(fieldBase, dark ? fieldDark : fieldLight, "resize-none", className)}
            {...props}
        />
    );
}
