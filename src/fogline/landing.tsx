"use client";

import { Hero } from "./components/hero";
import { Logo } from "./components/icons";
import { Clients, Features, Footer, Metrics, NavPill, Testimonials } from "./components/sections";

/** Landing completa. La píldora la maneja el scroll desde el Hero. */
export function FoglineLanding() {
    return (
        <div className="fogline">
            <a href="#" className="fl-brand" aria-label="Fogline">
                <Logo />
            </a>
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
