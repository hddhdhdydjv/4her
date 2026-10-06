"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Video de fondo del hero, sólo en desktop.
 *
 * El `<video>` recién se monta cuando la pantalla es de desktop: en mobile no
 * existe en el DOM, así que el celular no descarga ni un byte del archivo (un
 * video oculto con CSS igual se pide).
 *
 * Arranca muteado y en loop, que es la única forma en que los navegadores
 * permiten reproducir solo. Con `prefers-reduced-motion` no se reproduce:
 * queda quieto en su primer cuadro (o en el poster, si hay).
 */

function useMedia(query: string) {
    return useSyncExternalStore(
        (onChange) => {
            const media = window.matchMedia(query);
            media.addEventListener("change", onChange);
            return () => media.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches,
        // En el servidor no hay pantalla: se decide recién en el cliente.
        () => false,
    );
}

export function HeroVideo({ mp4, webm, poster }: { mp4: string | null; webm: string | null; poster: string | null }) {
    const desktop = useMedia("(min-width: 1024px)");
    const reduce = useMedia("(prefers-reduced-motion: reduce)");
    const ref = useRef<HTMLVideoElement>(null);

    // React no siempre deja `muted` como atributo y algunos navegadores lo
    // miran antes de permitir el autoplay: se fija por propiedad y se pide
    // play() explícito. Si igual lo bloquean, queda el primer cuadro.
    useEffect(() => {
        const video = ref.current;
        if (!video || reduce) return;
        video.muted = true;
        video.play().catch(() => {});
    }, [desktop, reduce]);

    if (!desktop || (!mp4 && !webm)) return null;

    return (
        <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay={!reduce}
            preload={reduce ? "metadata" : "auto"}
            poster={poster ?? undefined}
            aria-hidden="true"
        >
            {webm && <source src={webm} type="video/webm" />}
            {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
    );
}
