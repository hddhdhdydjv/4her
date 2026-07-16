import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";

export function Contact() {
    return (
        <section id="contacto" className="border-t border-[var(--color-border-secondary)]">
            <div className="mx-auto grid max-w-container gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
                <div className="max-w-xl">
                    <Badge>Cierre</Badge>
                    <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance text-primary sm:text-5xl">
                        Transformemos ideas en impacto
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-secondary">
                        Empecemos por una conversación.
                    </p>
                </div>

                <form className="rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-8">
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
        </section>
    );
}
