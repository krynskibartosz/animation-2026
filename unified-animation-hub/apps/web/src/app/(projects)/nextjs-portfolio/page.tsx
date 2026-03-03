import { Metadata } from "next";
import NextjsPortfolioClient from "./client";

export const metadata: Metadata = {
    title: "Next.js Portfolio | Animation Hub",
    description: "A modern portfolio built with Next.js and TailwindCSS",
};

export default function NextjsPortfolioPage() {
    return <NextjsPortfolioClient />;
}
