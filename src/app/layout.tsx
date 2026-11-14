import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SectionFader } from "@/components/motion/section-fader";
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
    title: "Fogline — Lift the fog around your code",
    description:
        "A calm, connected workspace for pull requests, code review and everything behind the change. Early access concept for Litebox.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${funnelDisplay.variable} ${funnelSans.variable} h-full antialiased`}
        >
            <body className="min-h-full bg-primary font-body text-primary">
                <LenisProvider>
                    <SectionFader />
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
