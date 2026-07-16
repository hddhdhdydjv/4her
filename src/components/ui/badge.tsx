import { cx } from "@/utils/cx";

type BadgeProps = {
    children: React.ReactNode;
    className?: string;
    tone?: "brand" | "neutral";
};

export function Badge({ children, className, tone = "brand" }: BadgeProps) {
    return (
        <span
            className={cx(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase",
                tone === "brand"
                    ? "bg-[var(--color-bg-brand-secondary)] text-brand-secondary"
                    : "bg-[var(--color-bg-secondary)] text-tertiary",
                className,
            )}
        >
            {children}
        </span>
    );
}
