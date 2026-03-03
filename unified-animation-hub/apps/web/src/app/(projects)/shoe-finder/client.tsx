"use client";

import dynamic from "next/dynamic";
import "@/components/projects/shoe-finder/styles/globals.css";

// We MUST dynamically import the R3F canvas component from a 'use client' file 
// to prevent SSR Hydration mismatch and allow `ssr: false` in Next 16.
const ShoeGrid = dynamic(
    () => import("@/components/projects/shoe-finder/components/grid/ShoeGrid"),
    { ssr: false }
);

export default function ShoeFinderClient() {
    return (
        <div className="w-full h-screen overflow-hidden bg-[#e0d6cc]">
            <ShoeGrid />
        </div>
    );
}
