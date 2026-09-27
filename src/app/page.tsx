import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { SelloVerde } from "@/components/sections/sello-verde";
import { CaseWePiper } from "@/components/sections/case-wepiper";
import { Values } from "@/components/sections/values";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/** Orden del wireframe Desktop de Figma (40:3764), + Sello Verde y FAQ (contenido nuevo). */
export default function Home() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <About />
                <Services />
                <SelloVerde />
                <CaseWePiper />
                <Values />
                <Process />
                <FAQ />
                <Contact />
            </main>
        </>
    );
}
