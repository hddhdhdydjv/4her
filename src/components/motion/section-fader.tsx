"use client";

import { useEffect } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";

// Fades all page sections in/out as the user scrolls.
// #servicios is excluded — it manages its own visibility internally.
// Runs directly on DOM refs for zero React re-renders per frame.
export function SectionFader() {
    const lenis = useLenisInstance();

    useEffect(() => {
        function update() {
            const vh = window.innerHeight;
            const sections = document.querySelectorAll<HTMLElement>("main > section[id]");

            for (const el of sections) {
                if (el.id === "servicios") continue;

                const rect = el.getBoundingClientRect();
                const top = rect.top;
                const bottom = rect.bottom;

                let opacity = 1;

                if (top > vh * 0.15) {
                    // Entering from below: fade in as top descends from 0.75vh to 0.15vh
                    opacity = Math.max(0, Math.min(1, (vh * 0.75 - top) / (vh * 0.6)));
                } else if (bottom < vh * 0.45) {
                    // Exiting from top: fade out as bottom rises from 0.45vh toward 0
                    opacity = Math.max(0, Math.min(1, bottom / (vh * 0.45)));
                }

                el.style.opacity = String(opacity);
            }
        }

        // Run once immediately so sections start at the right opacity.
        update();

        if (lenis) {
            lenis.on("scroll", update);
            return () => { lenis.off("scroll", update); };
        }

        // Fallback for when lenis isn't ready yet.
        window.addEventListener("scroll", update, { passive: true });
        return () => { window.removeEventListener("scroll", update); };
    }, [lenis]);

    return null;
}
