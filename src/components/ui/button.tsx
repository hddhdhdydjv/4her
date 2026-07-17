import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/utils/cx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
    "transition-colors duration-150 outline-none focus-visible:ring-2 " +
    "focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-[var(--color-bg-primary)] disabled:opacity-60 " +
    "disabled:pointer-events-none";

const variants: Record<Variant, string> = {
    primary:
        "bg-[var(--color-bg-brand-solid)] text-white hover:bg-[var(--color-bg-brand-solid_hover)]",
    secondary:
        "bg-transparent text-primary ring-1 ring-inset ring-[var(--color-border-primary)] " +
        "hover:bg-[var(--color-bg-secondary)]",
    ghost: "bg-transparent text-brand-secondary hover:text-[var(--color-text-brand-secondary_hover)]",
};

const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
};

type CommonProps = {
    variant?: Variant;
    size?: Size;
    className?: string;
    children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
        ComponentPropsWithoutRef<typeof Link>,
        "href" | "className" | "children"
    >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
        ComponentPropsWithoutRef<"button">,
        "className" | "children"
    >;

/** Si el contenido es texto plano, se duplica para el hover "texto que sube". */
function label(children: React.ReactNode) {
    if (typeof children !== "string") return children;
    return (
        <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {children}
            </span>
            <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                {children}
            </span>
        </span>
    );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
    const { variant = "primary", size = "md", className, children } = props;
    const classes = cx("group", base, variants[variant], sizes[size], className);

    if (props.href !== undefined) {
        const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
        return (
            <Link href={href} className={classes} {...rest}>
                {label(children)}
            </Link>
        );
    }

    const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
    return (
        <button className={classes} {...rest}>
            {label(children)}
        </button>
    );
}
