"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cubesData } from "./cubesData";
import styles from "./ThreeDImageCube.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ThreeDImageCube() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const cubesContainerRef = useRef<HTMLDivElement>(null);
    const header1Ref = useRef<HTMLDivElement>(null);
    const header2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Lenis
        const lenis = new Lenis();

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        const stickyHeight = window.innerHeight * 4;

        const interpolate = (start: number, end: number, progress: number) => {
            return start + (end - start) * progress;
        };

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: stickyRef.current,
                start: "top top",
                end: `+=${stickyHeight}px`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    if (!logoRef.current || !cubesContainerRef.current || !header1Ref.current || !header2Ref.current) return;

                    const initialProgress = Math.min(self.progress * 20, 1);
                    logoRef.current.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;

                    const logoOpacityProgress = self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
                    logoRef.current.style.opacity = (1 - logoOpacityProgress).toString();

                    const cubesOpacityProgress = self.progress > 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
                    cubesContainerRef.current.style.opacity = cubesOpacityProgress.toString();

                    const header1Progress = Math.min(self.progress * 2.5, 1);
                    header1Ref.current.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.25, header1Progress)})`;
                    header1Ref.current.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
                    header1Ref.current.style.opacity = (1 - header1Progress).toString();

                    const header2StartProgress = (self.progress - 0.4) * 10;
                    const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
                    const header2Scale = interpolate(0.75, 1, header2Progress);
                    const header2Blur = interpolate(10, 0, header2Progress);

                    header2Ref.current.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
                    header2Ref.current.style.filter = `blur(${header2Blur}px)`;
                    header2Ref.current.style.opacity = header2Progress.toString();

                    const firstPhaseProgress = Math.min(self.progress * 2, 1);
                    const secondPhaseProgress = self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

                    Object.entries(cubesData).forEach(([cubeClass, data]) => {
                        const cube = document.querySelector(`.${styles[cubeClass.replace('-', '')]}`) as HTMLElement;
                        if (!cube) return;

                        const { initial, final } = data;

                        const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
                        const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
                        const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
                        const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
                        const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);

                        const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);
                        let additionalRotation = 0;

                        if (cubeClass === "cube-2") {
                            additionalRotation = interpolate(0, 180, secondPhaseProgress);
                        } else if (cubeClass === "cube-4") {
                            additionalRotation = interpolate(0, -180, secondPhaseProgress);
                        }

                        cube.style.top = `${currentTop}%`;
                        cube.style.left = `${currentLeft}%`;
                        cube.style.transform = `
                translate3d(-50%, -50%, ${currentZ}px) 
                rotateX(${currentRotateX}deg) 
                rotateY(${currentRotateY + additionalRotation}deg)
                rotateZ(${currentRotateZ}deg)`;
                    });
                },
            });
        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <section className={`${styles.section} ${styles.sticky}`} ref={stickyRef}>
                <div className={styles.logo} ref={logoRef}>
                    <div className={styles.col}>
                        <div className={`${styles.block} ${styles.block1}`}></div>
                        <div className={styles.block}></div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.block}></div>
                        <div className={styles.block}></div>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.block}></div>
                        <div className={styles.block5}></div>
                    </div>
                </div>

                <div className={styles.cubes} ref={cubesContainerRef}>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className={`${styles.cube} ${styles[`cube${num}`] as string}`}>
                            {["front", "back", "right", "left", "top", "bottom"].map((face) => (
                                <div key={face} className={styles[face]}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={`/projects/3d-image-cube/assets/img${num}.jpeg`} alt={`Cube face ${num}`} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={styles.header1} ref={header1Ref}>
                    <h1>The first media company crafted for the digital first generation.</h1>
                </div>

                <div className={styles.header2} ref={header2Ref}>
                    <h2>Where innovation meets precision.</h2>
                    <p>
                        Symphonia unites visionary thinkers, creative architects, and analytical experts,
                        collaborating seamlessly to transform challenges into opportunities. Together, we
                        deliver tailored solutions that drive impact and inspire growth.
                    </p>
                </div>
            </section>

            <section className={`${styles.section} ${styles.about}`}>
                <h2>Your next section goes here</h2>
            </section>
        </div>
    );
}
