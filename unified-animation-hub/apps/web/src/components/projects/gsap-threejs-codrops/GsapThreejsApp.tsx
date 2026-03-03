'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother, Flip, SplitText } from 'gsap/all';
import FontFaceObserver from 'fontfaceobserver';

// Adjust these imports based on your alias setup
import Canvas from './app/components/canvas';
import Scroll from './app/components/scroll';
import TextAnimation from './app/components/text-animation';
import medias from './data.json';

// Note: Barba is omitted in this Next.js version as we use Next.js routing
// If page-to-page transitions are needed, we'd use a Next.js specific solution

export default function GsapThreejsApp() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, SplitText);

        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }

        const scroll = new Scroll();
        const canvas = new Canvas();
        const textAnimation = new TextAnimation();

        const loadFont = (onLoaded: () => void) => {
            const satoshi = new FontFaceObserver('Satoshi');
            satoshi.load().then(() => {
                onLoaded();
            });
        };

        const loadImages = (callback?: () => void) => {
            const imgs = document.querySelectorAll('img');
            let loadedImages = 0;
            const totalImages = imgs.length;

            if (totalImages === 0) {
                if (callback) callback();
                return;
            }

            imgs.forEach((img) => {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            if (callback) callback();
                            ScrollTrigger.refresh();
                        }
                    });
                }
            });

            if (loadedImages === totalImages) {
                if (callback) callback();
                ScrollTrigger.refresh();
            }
        };

        loadFont(() => {
            textAnimation.init();
        });

        loadImages(() => {
            canvas.createMedias();
            textAnimation.init();
            textAnimation.animateIn();
        });

        const onResize = () => {
            textAnimation.onResize();
            canvas.onResize();
        };

        window.addEventListener('resize', onResize);

        const render = () => {
            const scrollTop = scroll.getScroll() || 0;
            canvas.render(scrollTop, true);
        };

        gsap.ticker.add(render);

        return () => {
            window.removeEventListener('resize', onResize);
            gsap.ticker.remove(render);
            scroll.destroy();
            // canvas.destroy(); // Implement destroy if needed
            textAnimation.destroy();
        };
    }, []);

    return (
        <div ref={containerRef} id="app" className="gsap-threejs-hub">
            <div id="smooth-content">
                <div data-gallery-container className="container">
                    {/* Header content would go here */}
                    <div className="grid-container">
                        <div className="grid">
                            <h1
                                className="grid__item"
                                style={{ '--r': 1, '--c': 5, '--s': 5 } as any}
                                data-text-animation-in-duration="0.5"
                                data-text-animation-out-duration="0.4"
                                data-text-animation-in-delay="0.4"
                                data-text-animation
                                data-text-animation-split
                            >
                                Northern <br />Expeditions <br />1970–1978
                            </h1>
                            {medias.map((media, index) => (
                                <div
                                    key={index}
                                    className="grid__item"
                                    style={{
                                        '--r': index === 0 ? 1 : index === 1 ? 2 : index === 2 ? 2 : index === 3 ? 3 : index === 4 ? 4 : index === 5 ? 6 : index === 6 ? 7 : index === 7 ? 8 : 10,
                                        '--c': index === 0 ? 1 : index === 1 ? 4 : index === 2 ? 7 : index === 3 ? 3 : index === 4 ? 1 : index === 5 ? 3 : index === 6 ? 4 : index === 7 ? 1 : 4,
                                        '--s': index === 0 ? 4 : index === 1 ? 3 : index === 2 ? 2 : index === 3 ? 4 : index === 4 ? 4 : index === 5 ? 5 : index === 6 ? 4 : index === 7 ? 3 : 5
                                    } as any}
                                >
                                    <img loading="eager" src={`/gsap-threejs-codrops${media.url}`} alt="" />
                                    <p data-text-animation>{media.name}</p>
                                </div>
                            ))}
                            <p
                                className="grid__item"
                                style={{ fontSize: '1.45rem', '--r': 5, '--c': 4, '--s': 4 } as any}
                                data-text-animation-out-stagger="-0.03"
                                data-text-animation
                                data-text-animation-split
                            >
                                Dark spruce forest frowned on either side the frozen waterway...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Canvas for Three.js */}
            <canvas id="webgl" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}></canvas>

            <style jsx global>{`
                @font-face {
                    font-family: "Satoshi";
                    src: url("/gsap-threejs-codrops/fonts/satoshi/Satoshi-Variable.ttf") format("truetype");
                    font-weight: 100 900;
                    font-style: normal;
                    font-display: swap;
                }

                .gsap-threejs-hub {
                    --color-text: #fff;
                    --color-bg: #000;
                    --page-padding: 2rem;
                    background: var(--color-bg);
                    color: var(--color-text);
                    min-height: 100vh;
                    font-family: "Satoshi", system-ui, sans-serif;
                }

                #app {
                    position: relative;
                    z-index: 10;
                }

                #webgl {
                    position: fixed;
                    z-index: 0;
                    inset: 0;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }

                .gsap-threejs-hub h1 {
                    font-size: clamp(2rem, 5vw, 5rem);
                    font-weight: 400;
                    text-transform: uppercase;
                    line-height: 100%;
                    align-self: end;
                    padding-bottom: 1.5rem;
                    padding-left: 1rem;
                    margin: 0;
                }

                .gsap-threejs-hub .container {
                    display: flex;
                    flex-direction: column;
                }

                .gsap-threejs-hub .grid-container {
                    display: flex;
                    flex-direction: column;
                }

                .gsap-threejs-hub .grid {
                    display: grid;
                    padding: 10vh var(--page-padding);
                    column-gap: 1rem;
                    row-gap: 30vh;
                    grid-template-columns: repeat(9, 1fr);
                }

                .gsap-threejs-hub .grid__item {
                    grid-column: var(--c) / span var(--s);
                    grid-row: var(--r);
                }

                .gsap-threejs-hub .grid__item p {
                    padding-top: 0.5rem;
                    margin: 0;
                }

                .gsap-threejs-hub .container img {
                    width: 100%;
                    opacity: 0;
                }

                [data-text-animation] {
                    visibility: hidden;
                }
            `}</style>
        </div>
    );
}
