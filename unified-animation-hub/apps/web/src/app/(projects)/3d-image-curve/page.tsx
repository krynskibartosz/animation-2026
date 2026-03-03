"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useScroll } from "framer-motion";

const Scene = dynamic(
    () => import("@/components/projects/3d-image-curve/components/Scene"),
    { ssr: false }
);

export default function ThreeDImageCurvePage() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <main className="bg-black" style={{ height: "400vh" }} ref={container}>
            <div className="h-screen sticky top-0">
                <Scene scrollProgress={scrollYProgress} />
            </div>
        </main>
    );
}
