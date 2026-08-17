import Link from "next/link";
import { Isotipo, Logotipo } from "@/components/graphics/brand";
import { cx } from "@/utils/cx";

/**
 * Lockup de marca — Figma `Logo` (2205:2931): isotipo de 34px + logotipo.
 *
 * El isotipo trae su propio círculo claro, así que se apoya igual sobre fondo
 * claro u oscuro. El logotipo hereda `currentColor`: por defecto toma el color
 * de texto del sitio y con `dark` pasa a crema para fondos oscuros.
 */
export function Logo({
    href = "#inicio",
    className,
    dark = false,
}: {
    href?: string;
    className?: string;
    dark?: boolean;
}) {
    return (
        <Link
            href={href}
            className={cx("flex shrink-0 items-center gap-2", className)}
            aria-label="4her — inicio"
        >
            <Isotipo className="size-[34px] shrink-0" />
            <Logotipo
                className={cx(
                    "h-[34px] w-[61px] shrink-0",
                    dark ? "text-[var(--neutral-50)]" : "text-[var(--text-primary)]",
                )}
            />
        </Link>
    );
}
