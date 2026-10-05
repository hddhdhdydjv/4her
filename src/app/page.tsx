import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CaseWePiper } from "@/components/sections/case-wepiper";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/** Orden del diseño "4Her — Claude Design" (2254:5501). */
export default function Home() {
    return (
        <>
            <Navbar />

            <main>
                <Hero />
                <Services />
                <CaseWePiper />
                <Process />
                <FAQ />
                <Contact />
            </main>
        </>
    );
}
