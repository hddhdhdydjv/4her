"use client";

import { useEffect } from "react";
import { useLenisInstance } from "@/components/providers/lenis-provider";

// Fades sections out as they exit from the top. Sections always ENTER at full
// opacity — only exit fades. This prevents any blank-space gap between sections.
// #servicios is excluded — it manages its own visibility internally.
export function SectionFader() {
    const lenis = useLenisInstance();

    useEffect(() => {
        function update() {
            const vh = window.innerHeight;
            const sections = document.querySelectorAll<HTMLElement>("main > section[id]");

            for (const el of sections) {
                if (el.id === "servicios") continue;

                const bottom = el.getBoundingClientRect().bottom;

                // Fade out as section exits from top: 1 at 80%vh, 0 at 0.
                const opacity = bottom <= 0
                    ? 0
                    : Math.min(1, bottom / (vh * 0.8));

                el.style.opacity = String(opacity);
            }
        }

        update();

        if (lenis) {
            lenis.on("scroll", update);
            return () => { lenis.off("scroll", update); };
        }

        window.addEventListener("scroll", update, { passive: true });
        return () => { window.removeEventListener("scroll", update); };
    }, [lenis]);

    return null;
}
