import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { CaseWePiper } from "@/components/sections/case-wepiper";
import { Values } from "@/components/sections/values";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";

/**
 * v2: bento grid layout. El <Footer> fue integrado en <Contact>,
 * así que ya no se renderiza por separado.
 * El fondo de <main> es oscuro para que el SectionFader (fade-out al hacer
 * scroll) muestre el neutral-950 entre secciones que transicionan.
 */
export default function Home() {
    return (
        <>
            <Navbar />

            <main className="bg-[var(--neutral-950)]">
                <Hero />
                <About />
                <Services />
                <CaseWePiper />
                <Values />
                <Process />
                <Contact />
            </main>
        </>
    );
}
