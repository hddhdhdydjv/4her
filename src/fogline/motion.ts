"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenisInstance } from "@/components/providers/lenis-provider";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Conecta el scroll de Lenis (el de 4HER) con ScrollTrigger. Una vez por página. */
export function useLenisScrollTrigger() {
    const lenis = useLenisInstance();
    useEffect(() => {
        if (!lenis) return;
        const update = () => ScrollTrigger.update();
        lenis.on("scroll", update);
        ScrollTrigger.refresh();
        return () => lenis.off("scroll", update);
    }, [lenis]);
    return lenis;
}

export { gsap, ScrollTrigger };
