import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ServicesSticky } from "@/components/sections/services-sticky";
import { WhyUsScroll } from "@/components/sections/why-us-scroll";
import { ProcessScroll } from "@/components/sections/process-scroll";
import { SisterBrand } from "@/components/sections/sister-brand";
import { Contact } from "@/components/sections/contact";
import { SocialDock } from "@/components/sections/social-dock";
import { FourHisCta } from "@/components/sections/four-his-cta";
import { LoopSeam } from "@/components/sections/loop-seam";

export default function Home() {
    return (
        <>
            {/* Chrome fijo: nav (arriba), redes (abajo izq), CTA 4HIS (abajo der). Sin footer. */}
            <Navbar />
            <SocialDock />
            <FourHisCta />

            <main>
                <Hero />
                <About />
                <ServicesSticky />
                <WhyUsScroll />
                <ProcessScroll />
                <SisterBrand />
                <Contact />
                {/* Empalme del scroll infinito: al fondo, vuelve al inicio sin costura. */}
                <LoopSeam />
            </main>
        </>
    );
}
