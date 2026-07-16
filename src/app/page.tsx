import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Challenges } from "@/components/sections/challenges";
import { SisterBrand } from "@/components/sections/sister-brand";
import { Contact } from "@/components/sections/contact";
import { SocialDock } from "@/components/sections/social-dock";

export default function Home() {
    return (
        <>
            {/* Nav flotante fija + dock de redes fijo = navegación siempre en pantalla (sin footer) */}
            <Navbar />
            <SocialDock />

            <main>
                <Hero />
                <Marquee />
                <About />
                <Services />
                <WhyUs />
                <Process />
                {/* Sección opcional — quitar esta línea para removerla. */}
                <Challenges />
                <SisterBrand />
                <Contact />
            </main>
        </>
    );
}
