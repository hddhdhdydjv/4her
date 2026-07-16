import { Button } from "@/components/ui/button";

export function SisterBrand() {
    return (
        <section id="marca-hermana" className="px-6 py-20 lg:py-28">
            <div className="mx-auto max-w-container overflow-hidden rounded-3xl bg-[var(--color-bg-brand-section)] px-6 py-16 text-center sm:px-16 lg:py-24">
                <span className="text-xs font-semibold tracking-widest text-tertiary_on-brand uppercase">
                    Marca hermana
                </span>
                <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
                    Comunicación y tecnología, una sola casa
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-secondary_on-brand">
                    4HER y 4HIS son parte del mismo grupo. Si tu desafío también es técnico —web,
                    software, automatización—, lo resolvés con el mismo equipo, sin saltar entre
                    proveedores.
                </p>
                <div className="mt-9 flex justify-center">
                    <Button href="#contacto" size="lg">
                        Conocer 4HIS
                    </Button>
                </div>
            </div>
        </section>
    );
}
