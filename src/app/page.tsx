import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { CaseWePiper } from "@/components/sections/case-wepiper";
import { Values } from "@/components/sections/values";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";
import { FourHisCta } from "@/components/sections/four-his-cta";
import { LoopSeam } from "@/components/sections/loop-seam";

export default function Home() {
    return (
        <>
            {/* Chrome fijo: nav (arriba) y CTA 4HIS (abajo der). Sin footer. */}
            <Navbar />
            <FourHisCta />

            <main>
                <Hero />
                <About />
                <Services />
                <CaseWePiper />
                <Values />
                <Process />
                <Contact />
                {/* Empalme del scroll infinito: vuelve al inicio sin costura. */}
                <LoopSeam />
            </main>
        </>
    );
}
