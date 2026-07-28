import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

// Funnel Display: titulares. Funnel Sans: cuerpo y labels.
const funnelDisplay = Funnel_Display({
    variable: "--font-funnel-display",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const funnelSans = Funnel_Sans({
    variable: "--font-funnel-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "4HER - Comunicación & Marketing",
    description:
        "Marca y comunicación con criterio. Más estratégico que una agencia tradicional, más cercano que un freelance.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${funnelDisplay.variable} ${funnelSans.variable} h-full snap-y snap-proximity antialiased`}
        >
            <body className="min-h-full bg-primary font-body text-primary">
                <LenisProvider>{children}</LenisProvider>
            </body>
        </html>
    );
}
