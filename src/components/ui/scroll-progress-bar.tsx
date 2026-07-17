"use client";

import { useEffect, useState } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import type Lenis from "lenis";

export function ScrollProgressBar() {
    const lenis = useLenisInstance();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!lenis) return;
        const onScroll = (l: Lenis) => setProgress(l.progress);
        lenis.on("scroll", onScroll);
        return () => lenis.off("scroll", onScroll);
    }, [lenis]);

    return (
        <div
            aria-hidden="true"
            role="presentation"
            className="fixed top-0 left-0 z-[9999] h-[2px] w-full origin-left will-change-transform"
            style={{
                transform: `scaleX(${progress})`,
                background: "var(--brand-ink)",
                opacity: progress > 0 && progress < 1 ? 1 : 0,
                transition: "opacity 0.4s ease",
            }}
        />
    );
}
