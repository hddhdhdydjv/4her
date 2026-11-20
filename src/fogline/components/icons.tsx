/** Íconos de línea, trazo 1.25, 20×20. Mismo set que los indicadores de Figma. */

type IconProps = { name: "eye" | "search" | "wand" | "merge" | "arrow" | "arrow-up-right" | "menu"; size?: number; className?: string };

const paths: Record<IconProps["name"], React.ReactNode> = {
    eye: (
        <>
            <path d="M1.7 10.6c-.1-.2-.2-.3-.2-.6s.1-.4.2-.6C2.8 7.3 5.9 4.2 10 4.2s7.2 3.1 8.3 5.2c.1.2.2.3.2.6s-.1.4-.2.6c-1.1 2.1-4.2 5.2-8.3 5.2s-7.2-3.1-8.3-5.2Z" />
            <circle cx="10" cy="10" r="2.5" />
        </>
    ),
    search: (
        <>
            <circle cx="9" cy="9" r="6" />
            <path d="m17.5 17.5-4.2-4.2" />
        </>
    ),
    wand: (
        <>
            <path d="m12.9 7.1-9.4 9.4M14.2 3.3v1.6m0 6.6v1.6M10.9 4l.8.8m4.9 4.9.8.8M8.2 8.2l1.6 0m6.6 0 1.6 0" />
        </>
    ),
    merge: (
        <>
            <circle cx="15" cy="15" r="2.5" />
            <circle cx="5" cy="5" r="2.5" />
            <path d="M5 7.5V17.5M5 7.5c0 4.1 3.4 7.5 7.5 7.5" />
        </>
    ),
    arrow: <path d="M4.2 10h11.6m0 0L10 4.2m5.8 5.8L10 15.8" />,
    "arrow-up-right": <path d="M5.8 14.2 14.2 5.8m0 0H5.8m8.4 0v8.4" />,
    menu: <path d="M2.5 10h15M2.5 5h15M2.5 15h15" />,
};

export function Icon({ name, size = 20, className }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
}

export function Logo({ dark = false, size = 24 }: { dark?: boolean; size?: number }) {
    return (
        <span className="fl-logo" style={{ fontSize: size * 0.92, color: dark ? "#fff" : "var(--fl-text)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/fogline/brand/isotipo.svg"
                alt=""
                width={size}
                height={size}
                style={dark ? { filter: "invert(1)" } : undefined}
            />
            Fogline
        </span>
    );
}
