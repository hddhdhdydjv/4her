"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../motion";

/**
 * Titular en dos tonos que se "pinta" con el scroll: cada palabra pasa de un gris
 * muy claro a su color final (negro la primera frase, gris la segunda).
 */
export function ScrubText({
    lead,
    rest,
    as: Tag = "h2",
    className,
    id,
    breakBetween = false,
}: {
    lead: string;
    rest: string;
    as?: "h2" | "h3";
    className?: string;
    id?: string;
    breakBetween?: boolean;
}) {
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                el.querySelectorAll(".fl-word"),
                { opacity: 0.16 },
                {
                    opacity: 1,
                    stagger: 0.08,
                    ease: "none",
                    scrollTrigger: { trigger: el, start: "top 88%", end: "top 45%", scrub: 0.5 },
                },
            );
        }, el);
        return () => ctx.revert();
    }, []);

    const words = (t: string, cls?: string) =>
        t.split(" ").map((w, i) => (
            <span key={i} className={`fl-word ${cls ?? ""}`}>
                {w}{" "}
            </span>
        ));

    return (
        <Tag ref={ref} id={id} className={className}>
            {words(lead)}
            {breakBetween && <br />}
            {words(rest, "fl-muted")}
        </Tag>
    );
}
