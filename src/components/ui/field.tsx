import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/utils/cx";

const fieldBase =
    "w-full rounded-xl bg-[var(--color-bg-primary)] px-4 py-3 text-base text-primary " +
    "ring-1 ring-inset ring-[var(--color-border-primary)] placeholder:text-[var(--color-text-placeholder)] " +
    "outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-focus-ring)]";

export function Label({
    children,
    htmlFor,
}: {
    children: React.ReactNode;
    htmlFor: string;
}) {
    return (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-secondary">
            {children}
        </label>
    );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
    return <input className={cx(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
    return <textarea className={cx(fieldBase, "resize-none", className)} {...props} />;
}
