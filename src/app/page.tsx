import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Challenges } from "@/components/sections/challenges";
import { SisterBrand } from "@/components/sections/sister-brand";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <WhyUs />
                <Process />
                {/* Sección opcional — quitar esta línea para removerla. */}
                <Challenges />
                <SisterBrand />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
