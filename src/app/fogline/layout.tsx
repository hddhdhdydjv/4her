import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "@/fogline/fogline.css";

const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Fogline · AI code review for teams that ship",
    description:
        "Fogline reviews every pull request like your sharpest teammate: it flags bugs, risky changes and missing context before merge.",
};

export default function FoglineLayout({ children }: { children: React.ReactNode }) {
    return <div className={urbanist.variable}>{children}</div>;
}
