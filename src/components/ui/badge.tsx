import { cx } from "@/utils/cx";

type BadgeProps = {
    children: React.ReactNode;
    className?: string;
    tone?: "brand" | "neutral" | "onDark";
};

/** Eyebrow tipo label mono (estilo Aptos): guioncito + texto mono en mayúsculas. */
export function Badge({ children, className, tone = "brand" }: BadgeProps) {
    const color =
        tone === "onDark"
            ? "text-tertiary_on-brand"
            : tone === "neutral"
              ? "text-tertiary"
              : "text-brand-secondary";

    return (
        <span
            className={cx(
                "inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.14em] uppercase",
                color,
                className,
            )}
        >
            <span aria-hidden="true">—</span>
            {children}
        </span>
    );
}
