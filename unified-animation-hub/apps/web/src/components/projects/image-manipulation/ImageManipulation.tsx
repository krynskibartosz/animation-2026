"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { DistortionMaterial } from "./shaders";

extend({ DistortionMaterial });

// Register custom material
// The type declaration helps TypeScript know about the custom jsx element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            distortionMaterial: any;
        }
    }
}

function WebGLImage({ url }: { url: string }) {
    const materialRef = useRef<any>(null);
    const texture = useTexture(url);
    const { viewport } = useThree();
    const [hovered, setHovered] = useState(false);

    // Calculate the scale to maintain image aspect ratio
    // Assuming the image fits within a certain percentage of the viewport height
    const imageAspect = texture.image.width / texture.image.height;
    const viewportAspect = viewport.width / viewport.height;

    let scaleX, scaleY;

    // Set to a fixed size based on viewport height (like 80vh in original)
    const targetHeight = viewport.height * 0.8;
    const targetWidth = targetHeight * imageAspect;

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime;
        }
    });

    const handlePointerOver = () => {
        setHovered(true);
        if (materialRef.current) {
            gsap.to(materialRef.current, {
                uTimeline: 2,
                duration: 1,
            });
        }
    };

    const handlePointerOut = () => {
        setHovered(false);
        if (materialRef.current) {
            gsap.to(materialRef.current, {
                uTimeline: 0,
                duration: 1,
            });
        }
    };

    return (
        <mesh
            scale={[targetWidth, targetHeight, 1]}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
            {/* @ts-ignore */}
            <distortionMaterial
                ref={materialRef}
                uImage1={texture}
                uTime={0}
                uTimeline={0}
            />
        </mesh>
    );
}

export default function ImageManipulation() {
    return (
        <div className="relative w-full h-screen bg-[#45474B] flex items-center justify-center overflow-hidden">
            {/* Title */}
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
                <h1 className="text-3xl font-bold text-[#F5F7F8]">WebGL Image Manipulation</h1>
                <p className="mt-2 text-[#F5F7F8] opacity-70">Hover over the image to interact</p>
            </div>

            <div className="w-[30vw] h-[80vh] relative z-0">
                <Canvas camera={{ position: [0, 0, 200], fov: 45 }}>
                    <WebGLImage url="/projects/image-manipulation/1.webp" />
                </Canvas>
            </div>
        </div>
    );
}
