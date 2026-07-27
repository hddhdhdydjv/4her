import Link from "next/link";
import { IsoMark } from "@/components/graphics/iso";
import { cx } from "@/utils/cx";

/**
 * Lockup de marca — Figma `Link` (nav 59:5967 / footer 78:8300).
 * Círculo de 34px en bg/tertiary con el isotipo recortado + "4her"
 * en Funnel Display 26.77px, tracking -0.474px.
 */
export function Logo({ href = "#inicio", className }: { href?: string; className?: string }) {
    return (
        <Link href={href} className={cx("flex shrink-0 items-center gap-2", className)} aria-label="4her — inicio">
            <span className="flex size-[34px] items-center justify-center overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                <IsoMark className="h-[46.6px] w-[31.3px] shrink-0" />
            </span>
            <span className="font-display text-[1.673rem] leading-[1.0625] font-normal tracking-[-0.0177em] text-[var(--text-primary)]">
                4her
            </span>
        </Link>
    );
}
