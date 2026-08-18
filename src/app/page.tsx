import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { CaseWePiper } from "@/components/sections/case-wepiper";
import { Values } from "@/components/sections/values";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";

/** Orden del wireframe Desktop de Figma (40:3764). */
export default function Home() {
    return (
        <>
            <Navbar />

            <main>
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
