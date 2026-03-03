"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import('@/components/projects/3d-glass-effect/components/Scene'), { ssr: false });

export default function ThreeDGlassEffectPage() {
    return (
        <main className="relative h-screen bg-[#0a0a0a]">
            <Scene />
        </main>
    );
}
