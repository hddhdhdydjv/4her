/**
 * LinkedIn fijo abajo a la izquierda: solo el icono en un redondel.
 * TODO: poner la URL real de LinkedIn.
 */
export function SocialDock() {
    return (
        <div className="pointer-events-none fixed bottom-4 left-4 z-40">
            <a
                href="#"
                aria-label="LinkedIn de 4HER"
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-primary)] bg-[var(--brand-cream)]/90 text-primary shadow-[0_6px_24px_rgba(20,21,18,0.10)] backdrop-blur-md transition-transform hover:-translate-y-0.5"
            >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
            </a>
        </div>
    );
}
