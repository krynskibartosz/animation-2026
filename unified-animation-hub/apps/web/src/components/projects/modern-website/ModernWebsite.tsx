'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import './ModernWebsite.css';

const ModernWebsite = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const minicircleRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initialize Locomotive Scroll
        let scroll: any;
        if (scrollRef.current) {
            scroll = new LocomotiveScroll({
                el: scrollRef.current,
                smooth: true,
            } as any);
        }

        // First Page Animation
        const firstPageAnim = () => {
            const tl = gsap.timeline();

            tl.from("#nav", {
                y: '-10',
                opacity: 0,
                duration: 1.2,
                ease: "expo.inOut",
            })
                .to(".boundingelem", {
                    y: 0,
                    duration: 1,
                    delay: -1,
                    ease: "expo.inOut",
                    stagger: 0.2,
                })
                .from("#herofooter", {
                    y: -10,
                    opacity: 0,
                    duration: 1.5,
                    delay: -1,
                    ease: "expo.inOut",
                });
        };

        // Mouse Follower Logic
        const circleMouseFollower = (xscale = 1, yscale = 1) => {
            const handleMouseMove = (dets: MouseEvent) => {
                if (minicircleRef.current) {
                    minicircleRef.current.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
                }
            };
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        };

        const circleChaptaKaro = () => {
            let xscale = 1;
            let yscale = 1;
            let xprev = 0;
            let yprev = 0;

            const handleMouseMove = (dets: MouseEvent) => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);

                const xdiff = dets.clientX - xprev;
                const ydiff = dets.clientY - yprev;

                xscale = gsap.utils.clamp(0.8, 1.2, xdiff * 0.1 || 1);
                yscale = gsap.utils.clamp(0.8, 1.2, ydiff * 0.1 || 1);

                xprev = dets.clientX;
                yprev = dets.clientY;

                if (minicircleRef.current) {
                    minicircleRef.current.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
                }

                timeoutRef.current = setTimeout(() => {
                    if (minicircleRef.current) {
                        minicircleRef.current.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
                    }
                }, 100);
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        };

        // Project Hover Animation
        const handleProjectHover = () => {
            const elements = document.querySelectorAll(".elem");
            elements.forEach((elem) => {
                let rotate = 0;
                let diffrot = 0;

                const img = elem.querySelector("img");

                const handleMouseMove = (dets: any) => {
                    const rect = elem.getBoundingClientRect();
                    const diff = dets.clientY - rect.top;
                    diffrot = dets.clientX - rotate;
                    rotate = dets.clientX;

                    gsap.to(img, {
                        opacity: 1,
                        ease: "power3",
                        top: diff,
                        left: dets.clientX,
                        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(img, {
                        opacity: 0,
                        ease: "power3",
                        duration: 0.5,
                    });
                };

                elem.addEventListener("mousemove", handleMouseMove);
                elem.addEventListener("mouseleave", handleMouseLeave);
            });
        };

        firstPageAnim();
        const cleanupFollower = circleChaptaKaro();
        handleProjectHover();

        return () => {
            if (scroll) scroll.destroy();
            cleanupFollower();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="modern-website-root">
            <div id="minicircle" ref={minicircleRef}></div>
            <div id="main" ref={scrollRef} data-scroll-container>
                <div id="hero">
                    <div id="nav">
                        <a href="#" className="logo">Pooja Hooda</a>
                        <div id="navright">
                            <a href="https://www.linkedin.com/in/pooja-h-21b473124/" target="_blank">linkedin</a>
                            <a href="https://github.com/poojahooda22" target="_blank">Github</a>
                            <a href="https://leetcode.com/phooda938/" target="_blank">leetcode</a>
                            <a href="https://codepen.io/robinhudh" target="_blank">codepen</a>
                        </div>
                    </div>
                    <div id="heading">
                        <div className="bounding">
                            <h1 className="boundingelem">frontend</h1>
                        </div>
                        <div className="blockText">
                            <div className="bounding">
                                <h1 className="boundingelem" id="secondh1">Developer</h1>
                            </div>
                            <div className="bounding">
                                <h5 className="boundingelem">Based in Delhi</h5>
                            </div>
                        </div>
                    </div>
                    <div id="herofooter">
                        <a href="https://www.toppersnotes.co/" target="_blank">
                            Previously worked at ToppersNotes <i className="ri-arrow-right-up-line"></i>
                        </a>
                        <div id="iconset">
                            <div className="circle">
                                <a href="#second"><i className="ri-arrow-down-line"></i></a>
                            </div>
                            <div className="circle">
                                <a href="#about"><i className="ri-arrow-down-line"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="second">
                    <div className="elem">
                        <a href="https://nextjs-portfolio-nine-liard.vercel.app/" target="_blank">
                            <img src="/modern-website/nextjs-website.png" alt="Nextjs Portfolio" />
                            <h1>Nextjs Portfolio</h1>
                        </a>
                    </div>
                    <div className="elem">
                        <a href="https://poojahooda22.github.io/Cuberto-newWebsite-Clone/" target="_blank">
                            <img src="/modern-website/cubertoWebsite.png" alt="Cuberto Clone" />
                            <h1>Cuberto Clone</h1>
                        </a>
                    </div>
                    <div className="elem">
                        <a href="https://poojahooda22.github.io/landing-page-03/" target="_blank">
                            <img src="/modern-website/hero-section.png" alt="Landing Page" />
                            <h1>Landing Page</h1>
                        </a>
                    </div>
                    <div className="elem elemlast">
                        <a href="https://poojahooda22.github.io/mousemove-images-animation/" target="_blank">
                            <img src="/modern-website/GSAPanimation.png" alt="GSAP Animation" />
                            <h1>GSAP Animation</h1>
                        </a>
                    </div>
                    <div className="elem">
                        <a href="https://poojahooda22.github.io/Animated-tab-bar/" target="_blank">
                            <img src="/modern-website/tab-bar.png" alt="Animated tab bar" />
                            <h1>Animated tab bar</h1>
                        </a>
                    </div>
                </div>

                <div id="about">
                    <div id="textabout">
                        <h5>(About me)</h5>
                        <p>
                            {"I'm a Front-end developer with one year of dedicated front-end learning under my belt. My passion lies in crafting responsive websites that seamlessly adapt to any device. I thrive on exploring 2D and 3D frameworks to create interactive web experiences that captivate users. Expertise in Reactjs, Nextjs with typescript, MongoDB, GSAP, and exploring more."}
                        </p>
                        <a href="https://www.linkedin.com/in/pooja-h-21b473124/" target="_blank" className="chronicle">
                            <span><em>Let's talk</em></span>
                            <span><em>Let's talk</em></span>
                        </a>
                    </div>
                </div>

                <div id="subscribe">
                    <h4>
                        follow me on linkedin <i className="ri-arrow-right-up-line"></i>
                    </h4>
                </div>

                <div id="footer">
                    <div id="footerleft">
                        <h4>© 2026 Pooja Hooda</h4>
                    </div>
                    <div id="footerright">
                        <a href="https://www.linkedin.com/in/pooja-h-21b473124/" target="_blank">linkedin</a>
                        <a href="https://github.com/poojahooda22" target="_blank">Github</a>
                        <a href="https://leetcode.com/phooda938/" target="_blank">leetcode</a>
                        <a href="https://codepen.io/robinhudh" target="_blank">codepen</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernWebsite;
