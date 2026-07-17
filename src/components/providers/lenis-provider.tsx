"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";

const LenisCtx = createContext<Lenis | null>(null);

export function useLenisInstance() {
    return useContext(LenisCtx);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const instance = new Lenis({
            duration: 1.15,
            easing: (t) => 1 - Math.pow(1 - t, 4),
        });
        setLenis(instance);

        let raf = 0;
        const loop = (time: number) => {
            instance.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            instance.destroy();
        };
    }, []);

    return (
        <LenisCtx.Provider value={lenis}>
            <ScrollProgressBar />
            {children}
        </LenisCtx.Provider>
    );
}
