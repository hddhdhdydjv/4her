"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";

type SplitRevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    by?: "words" | "lines";
    as?: ElementType;
};

export function SplitReveal({
    children,
    className,
    delay = 0,
    stagger: staggerMs = 60,
    by = "words",
    as: Tag = "h2",
}: SplitRevealProps) {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (typeof IntersectionObserver === "undefined") return;

        let cancelled = false;
        let busy = false;
        let io: IntersectionObserver | null = null;

        import("animejs").then(({ splitText, animate, stagger, set }) => {
            if (cancelled || !el) return;

            io = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (!entry.isIntersecting || busy || cancelled) continue;

                        busy = true;
                        const splitter = splitText(
                            el,
                            by === "lines" ? { lines: true, words: false } : { words: true },
                        );
                        const targets = by === "lines" ? splitter.lines : splitter.words;
                        if (!targets.length) { busy = false; splitter.revert(); continue; }

                        set(targets, { opacity: 0, translateY: 18, filter: "blur(5px)" });
                        animate(targets, {
                            opacity: [0, 1],
                            translateY: [18, 0],
                            filter: ["blur(5px)", "blur(0px)"],
                            duration: 850,
                            delay: stagger(staggerMs, { start: delay }),
                            ease: "outExpo",
                            onComplete: () => {
                                if (!cancelled) splitter.revert();
                                busy = false;
                            },
                        });
                    }
                },
                { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
            );
            io.observe(el);
        });

        return () => {
            cancelled = true;
            io?.disconnect();
        };
    }, [delay, staggerMs, by]);

    return (
        <Tag ref={ref} className={className}>
            {children}
        </Tag>
    );
}
