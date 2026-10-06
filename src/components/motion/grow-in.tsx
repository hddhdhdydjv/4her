"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

/**
 * La caja ya está ahí y, cada vez que entra en cámara, crece apenas hasta su
 * tamaño: no es un "pop" desde invisible, sólo escala.
 *
 * Umbral alto: con una caja casi del ancho de la pantalla, a un umbral bajo
 * disparaba con la mitad de arriba todavía fuera de cámara y para cuando se
 * veía entera ya había terminado de crecer.
 */
export function GrowIn({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <Reveal variant="grow" threshold={0.5} className={className}>
            {children}
        </Reveal>
    );
}
