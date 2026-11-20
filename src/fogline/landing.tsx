"use client";

import { Hero } from "./components/hero";
import { Clients, Features, Footer, Metrics, NavPill, Testimonials } from "./components/sections";

/** Landing completa. La píldora la maneja el scroll desde el Hero. */
export function FoglineLanding() {
    return (
        <div className="fogline">
            <NavPill />
            <Hero />
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
