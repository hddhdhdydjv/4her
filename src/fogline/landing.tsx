"use client";

import { useCallback, useState } from "react";
import { Hero } from "./components/hero";
import { Clients, Features, Footer, Metrics, NavPill, Testimonials } from "./components/sections";

/** Landing completa. El paso del hero decide si la píldora es botón o navegación. */
export function FoglineLanding() {
    const [step, setStep] = useState(0);
    const onStep = useCallback((s: number) => setStep(s), []);

    return (
        <div className="fogline">
            <NavPill mode={step === 0 ? "button" : "nav"} />
            <Hero onStep={onStep} />
            <div className="fl-after">
                <Clients />
                <Features />
                <Metrics />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}
