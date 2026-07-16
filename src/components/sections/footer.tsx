const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "4HIS", href: "#marca-hermana" },
];

const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
];

export function Footer() {
    return (
        <footer className="border-t border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]">
            <div className="mx-auto max-w-container px-6 py-16">
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-sm">
                        <p className="font-display text-2xl font-semibold tracking-tight text-primary">4HER</p>
                        <p className="mt-3 text-sm text-tertiary">Comunicación &amp; Marketing</p>
                        <p className="mt-1 text-sm text-tertiary">Parte de una propuesta integral.</p>
                    </div>

                    <div className="flex gap-16">
                        <nav>
                            <p className="text-xs font-semibold tracking-widest text-quaternary uppercase">
                                Navegación
                            </p>
                            <ul className="mt-4 flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-secondary transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <nav>
                            <p className="text-xs font-semibold tracking-widest text-quaternary uppercase">
                                Redes
                            </p>
                            <ul className="mt-4 flex flex-col gap-3">
                                {socialLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-secondary transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="mt-14 border-t border-[var(--color-border-primary)] pt-8">
                    <p className="text-sm text-tertiary">
                        © {new Date().getFullYear()} 4HER · Comunicación &amp; Marketing
                    </p>
                </div>
            </div>
        </footer>
    );
}
