'use client';

import { useEffect, useRef, useState } from 'react';
import { animate as anime, stagger } from 'animejs';
import { useAtomValue } from 'jotai';
import { loadPagePromise, viewPortStateAtom, scrollAnchorStateAtom } from '../lib/store';
import { loadImage } from '../lib/utils';
import { useAtom } from 'jotai';

export default function HomeSection() {
    const homeContainerRef = useRef<HTMLDivElement>(null);
    const backgroundContainerRef = useRef<HTMLDivElement>(null);
    const backgroundImageRef = useRef<HTMLImageElement>(null);
    const titleWord1Ref = useRef<HTMLDivElement>(null);
    const titleWord2Ref = useRef<HTMLDivElement>(null);
    const shortDetailsRef = useRef<HTMLParagraphElement>(null);
    const callToActionRef = useRef<HTMLDivElement>(null);

    const signaturePath1Ref = useRef<SVGPathElement>(null);
    const signaturePath2Ref = useRef<SVGPathElement>(null);
    const signaturePath3Ref = useRef<SVGPathElement>(null);
    const signaturePath4Ref = useRef<SVGPathElement>(null);

    const [bgImageSrc, setBgImageSrc] = useState<string>('');
    const [arrowImageSrc, setArrowImageSrc] = useState<string>('');
    const [scrollAnchorState, setScrollAnchorState] = useAtom(scrollAnchorStateAtom);
    const viewPortState = useAtomValue(viewPortStateAtom);

    useEffect(() => {
        const loadAssets = async () => {
            const bgPromise = loadImage('/projects/musabhassan/assets/imgs/home-back.jpg');
            const arrowPromise = loadImage('/projects/musabhassan/assets/imgs/scroll_arrow.png');
            setBgImageSrc(await bgPromise);
            setArrowImageSrc(await arrowPromise);
        };
        loadAssets();
    }, []);

    useEffect(() => {
        loadPagePromise.then(() => {
            if (homeContainerRef.current) {
                setScrollAnchorState(prev => ({ ...prev, home: homeContainerRef.current! }));
            }

            if (viewPortState.slickscrollInstance && backgroundContainerRef.current) {
                viewPortState.slickscrollInstance.addOffset({
                    element: backgroundContainerRef.current,
                    speedY: 0.8
                });
            }

            introAnimations();
        });
    }, [viewPortState.slickscrollInstance]);

    const introAnimations = () => {
        const signatureAnimation = { strokeDashoffset: '0' };

        signaturePath1Ref.current?.animate([signatureAnimation], {
            duration: 1000,
            delay: 500,
            easing: 'cubic-bezier(.72,.3,.25,1)',
            fill: 'forwards'
        });
        signaturePath2Ref.current?.animate([signatureAnimation], {
            duration: 300,
            delay: 1500,
            easing: 'cubic-bezier(.47,.41,.26,1)',
            fill: 'forwards'
        });
        signaturePath3Ref.current?.animate([signatureAnimation], {
            duration: 200,
            delay: 1800,
            easing: 'cubic-bezier(.47,.41,.26,1)',
            fill: 'forwards'
        });
        signaturePath4Ref.current?.animate([signatureAnimation], {
            duration: 1000,
            delay: 2000,
            easing: 'cubic-bezier(.47,.41,.26,1)',
            fill: 'forwards'
        });

        if (backgroundContainerRef.current && backgroundImageRef.current) {
            Object.assign(backgroundContainerRef.current.style, {
                height: "0",
                transform: "scale(1.3)",
            });
            backgroundImageRef.current.style.transform = "translateY(80%) scale(1.4)";

            anime(backgroundContainerRef.current, {
                height: "100%",
                scale: 1,
                easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
                duration: 1500,
                delay: 500,
                complete: () => {
                    if (backgroundContainerRef.current)
                        backgroundContainerRef.current.style.boxShadow = "3px 9px 18px rgba(0, 0, 0, 0.2)";
                }
            });

            anime(backgroundImageRef.current, {
                translateY: "0",
                scale: 1,
                easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
                duration: 1500,
                delay: 500
            });
        }

        const titleElements = [titleWord1Ref.current, titleWord2Ref.current, shortDetailsRef.current, callToActionRef.current].filter(Boolean) as HTMLElement[];
        titleElements.forEach(e => {
            e.style.transform = "translateY(130%) rotate(10deg)";
        });

        anime(titleElements, {
            rotate: "0",
            translateY: "0%",
            easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
            duration: 900,
            delay: stagger(80, { start: 500 })
        });
    };

    return (
        <div id="content-container" style={{ paddingTop: '23vh' }} ref={homeContainerRef}>
            <div className="content-wrapper">
                <div className="flex">
                    <div className="flex-wrapper first">
                        <svg id="signature" className="h-signature" viewBox="0 0 190 136.9">
                            <g>
                                <path
                                    ref={signaturePath1Ref}
                                    className="path-1"
                                    style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeOpacity: 1, strokeMiterlimit: 4 }}
                                    d="M38.1,51c0,0,4.9-34.4,39.6-37.7c11.1-1.1-11.5,86.2-48.9,87.5c-18.5,0.6,19-69.3,51.7-84.4c21.3-9.8,15.3,26,15.3,26s6.2-9.3,7.9-6.1c1.7,3.1,0.1,5.1,6.9-1.9c1-1.2,13.9,3.3,18.8-1.3c1.4-1.3,6.4,1.3,6.4,1.3" />
                                <path
                                    ref={signaturePath2Ref}
                                    className="path-2"
                                    style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeOpacity: 1, strokeMiterlimit: 4 }}
                                    d="M132.2,48.3l-23.9,78.8" />
                                <path
                                    ref={signaturePath3Ref}
                                    className="path-3"
                                    style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeOpacity: 1, strokeMiterlimit: 4 }}
                                    d="M110.3,55.3c0,0-0.7,11.7-2.8,18s-6.7,20.2-6.9,24.1" />
                                <path
                                    ref={signaturePath4Ref}
                                    className="path-4"
                                    style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', strokeOpacity: 1, strokeMiterlimit: 4 }}
                                    d="M122,74.4c0,0-5.9-8-17.1-6.7c-11.1,1.3-20.2,11.3-21.1,12.6c-0.9,1.3-10,9.6,2.2,15s38.9-7.2,38.9-7.2s17.8-10,18.9-10s-4.6,5.9-4.3,7.2c0.4,1.3,2.8,2,7.2-1.5c1-0.8,17.2-0.8,22.2,1c1.9,0.7,3.5-0.2,5-1.4c1-0.8,9.4,2,9.4,2" />
                            </g>
                        </svg>
                    </div>

                    <div className="flex-wrapper second">
                        <h1 className="title">
                            <div className="title-mask">
                                <div className="word" ref={titleWord1Ref}>Musab</div>
                            </div><br />
                            <div className="title-mask">
                                <div className="word" ref={titleWord2Ref}>Hassan</div>
                            </div>
                        </h1>
                        <div className="occupation mask">
                            <p className="paragraph" ref={shortDetailsRef}>
                                web developer from british columbia, canada
                            </p>
                        </div>
                        <div className="wrapper action-mask">
                            <div className="action" ref={callToActionRef}>
                                <div className="mask">
                                    {arrowImageSrc && <img src={arrowImageSrc} alt="" className="scroll-arrow" />}
                                </div>
                                <div style={{ marginLeft: '10px' }}>scroll</div>
                            </div>
                        </div>
                    </div>

                    <div className="parallax-wrapper home-back" ref={backgroundContainerRef}>
                        {bgImageSrc && (
                            <img
                                ref={backgroundImageRef}
                                src={bgImageSrc}
                                draggable="false"
                                alt="Home Background"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                #content-container {
                    height: 100vh;
                    width: 100vw;
                    padding: 12vh 7vw;
                    box-sizing: border-box;
                    position: relative;
                }
                .content-wrapper {
                    position: relative;
                    height: 100%;
                    box-sizing: border-box;
                    z-index: 2;
                }
                .flex {
                    z-index: 2;
                    width: 95%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    position: relative;
                    box-sizing: border-box;
                }
                .flex-wrapper {
                    position: relative;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .flex-wrapper.second {
                    margin-right: 5vw;
                    justify-content: flex-end;
                }
                h1.title {
                    font-weight: 400;
                    text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
                    font-size: 8vh;
                    margin: 0;
                    color: #fff;
                }
                .title-mask {
                    overflow: hidden;
                    display: inline-flex;
                }
                .mask {
                    overflow: hidden;
                }
                .h-signature {
                    width: 35vh;
                    margin-left: -6vh;
                }
                .occupation {
                    position: relative;
                    margin-top: 8vh;
                }
                .paragraph {
                    font-size: 2vh;
                    color: #ccc;
                }
                .action-mask {
                    margin-top: 10vh;
                    margin-right: 7vw;
                    display: inline-flex;
                    overflow: hidden;
                }
                .action {
                    font-size: 2vh;
                    letter-spacing: 0.5vh;
                    text-transform: uppercase;
                    color: white;
                    position: relative;
                    display: inline-flex;
                    flex-direction: row;
                    align-items: center;
                }
                .scroll-arrow {
                    height: 2.3vh;
                    animation: scrollArrowLoop 3s ease infinite;
                }
                .parallax-wrapper {
                    position: absolute;
                    left: 0;
                    z-index: -1;
                    width: 80%;
                    height: 100%;
                    margin-left: 5%;
                    border-radius: 1.5vh;
                    overflow: hidden;
                    box-sizing: border-box;
                    user-select: none;
                    transition: box-shadow 0.6s ease;
                }
                .path-1 { stroke-dasharray: 365; stroke-dashoffset: 365; }
                .path-2 { stroke-dasharray: 85; stroke-dashoffset: 85; }
                .path-3 { stroke-dasharray: 45; stroke-dashoffset: 45; }
                .path-4 { stroke-dasharray: 180; stroke-dashoffset: 180; }

                @keyframes scrollArrowLoop {
                    0% { transform: translateY(-120%); }
                    30% { transform: translateY(0%); }
                    70% { transform: translateY(0%); }
                    100% { transform: translateY(120%); }
                }

                @media (max-width: 1250px) {
                    .flex-wrapper.first { display: none; }
                    .flex { justify-content: center; width: 100%; }
                    .flex-wrapper.second { justify-content: center; margin: 0; }
                    .parallax-wrapper { width: 100%; margin-left: 0; opacity: 0.7; }
                }
            `}</style>
        </div>
    );
}
