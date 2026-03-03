"use client";

import dynamic from "next/dynamic";
import "@/components/projects/3dbook-slider/index.css";

const App = dynamic(() => import("@/components/projects/3dbook-slider/App"), { ssr: false });

export default function ThreeDBookSliderPage() {
    return (
        <main className="relative w-screen h-screen overflow-hidden">
            <App />
        </main>
    );
}
