import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";

/** Cierre. Bloque sage. Última sección (sin footer). */
export function Contact() {
    return (
        <section id="contacto" className="bg-[var(--brand-sage)]">
            <div className="mx-auto max-w-container px-6 pt-24 pb-40 lg:pt-32 lg:pb-48">
                <Reveal>
                    <div className="grid gap-14 lg:grid-cols-2">
                        <div className="max-w-xl">
                            <Badge tone="neutral">Cierre</Badge>
                            <h2 className="mt-6 font-display text-5xl leading-[0.98] font-semibold tracking-tight text-balance text-primary sm:text-6xl">
                                Transformemos ideas en impacto
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-secondary">
                                Empecemos por una conversación.
                            </p>
                        </div>

                        <form className="rounded-3xl bg-[var(--brand-cream)] p-8">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" name="name" type="text" placeholder="Tu nombre" autoComplete="name" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        autoComplete="email"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" name="message" rows={4} placeholder="Contanos qué tenés en mente" />
                                </div>
                                <Button size="lg" type="submit" className="mt-1 w-full">
                                    Contactanos
                                </Button>
                            </div>
                        </form>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
