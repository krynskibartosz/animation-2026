"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

export default function AxelPortfolio() {
    const loaderRef = useRef(null);
    const loaderNumberRef = useRef(null);
    const loaderStarRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        const loader = loaderRef.current;
        const loaderNumber = loaderNumberRef.current;
        const loaderStar = loaderStarRef.current;
        const mainEl = mainRef.current;
        if (!loader || !loaderNumber || !loaderStar || !mainEl) return;

        // Loader animation
        let countProgress = 0;
        const prgInt = setInterval(() => {
            countProgress += Math.floor(Math.random() * 8);
            if (countProgress >= 100) {
                countProgress = 100;
                clearInterval(prgInt);
                gsap.to(loaderStar, {
                    scale: 100,
                    duration: 1.9,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.to(loader, {
                            opacity: 0,
                            duration: 0.6,
                            onComplete: () => {
                                loader.style.display = "none";
                            },
                        });
                    },
                });
            }
            loaderNumber.textContent = countProgress + "%";
            gsap.to(loaderStar, {
                rotation: countProgress * 3.6,
                duration: 0.6,
                ease: "linear",
            });
        }, 80);

        // SVG mask animation
        const tl1 = gsap.timeline({
            scrollTrigger: {
                scroller: mainEl,
                trigger: "#axel-page7",
                start: "50% 50%",
                end: "230% 50%",
                scrub: true,
                pin: true,
            },
        });
        tl1.to("#axel-page7 .svg", { maskSize: "200%" }, "svg");
        tl1.to("#axel-page7 .come-up-img", { backgroundSize: "100%" }, "svg");
        tl1.to("#axel-page7 .svg2", { maskSize: "200%" }, "svg2");
        tl1.to("#axel-page7 .come-up-img2", { backgroundSize: "100%" }, "svg2");
        tl1.to("#axel-page7 .overlay .overlay-heading", { opacity: 0, duration: 0.3, delay: -0.12 }, "svg2");
        tl1.to("#axel-page7 .overlay .overlay-top .button1, #axel-page7 .overlay .overlay-top .button2", { opacity: 0, duration: 0.3, delay: -0.12 }, "svg2");
        tl1.to(".axel-overlay-heading h1", { opacity: 0, duration: 0.3, delay: 0.8 }, "end");
        tl1.to(".axel-overlay-top .button1, .axel-overlay-top .button2", { opacity: 0, duration: 0.3, delay: 0.8 }, "end");

        // Main heading shrink
        const tl2 = gsap.timeline({
            scrollTrigger: {
                scroller: mainEl,
                trigger: "#axel-page1",
                start: "top 18%",
                end: "top -400%",
                scrub: true,
            },
        });
        tl2.to("#axel-page-heading h1", { fontSize: "3.72vw" });

        // Page 7 color change
        const tl3 = gsap.timeline({
            scrollTrigger: {
                scroller: mainEl,
                trigger: "#axel-page7",
                start: "top 5%",
                end: "top -10%",
                scrub: true,
            },
        });
        tl3.to("#axel-page-heading h1", { color: "#fff" }, "page7");
        tl3.to("#axel-nav-part1-middle h4", { color: "#fff" }, "page7");
        tl3.to("#axel-nav-part1-end h4", { color: "#fff" }, "page7");
        tl3.to("#axel-nav-part2 .text h3", { color: "#a3a3a3" }, "page7");
        tl3.to("#axel-nav-part2 .first h3", { color: "#fff" }, "page7");

        return () => {
            clearInterval(prgInt);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const IMG = "/axel-portfolio/assets";

    return (
        <div className="axel-portfolio-wrapper">
            <div id="axel-loader" ref={loaderRef}>
                <h4>LOADING</h4>
                <img id="axel-loader-star" ref={loaderStarRef} src={`${IMG}/svg-star-white.svg`} alt="" />
                <h4 id="axel-loader-number" ref={loaderNumberRef}>0</h4>
            </div>

            <div id="axel-nav">
                <div id="axel-page-heading">
                    <h1>Axel<br />Vanhessche</h1>
                </div>
                <div id="axel-nav-part1">
                    <div id="axel-nav-part1-middle">
                        <h4>PHOTOGRAPHER FROM</h4>
                        <h4>FRANCE BASED IN PARIS</h4>
                    </div>
                    <div id="axel-nav-part1-end">
                        <h4>LAST UPDATE</h4>
                        <h4>FEB 2024</h4>
                    </div>
                </div>
                <div id="axel-nav-part2">
                    <div className="text first"><h3 style={{ color: "black" }}>INDEX,</h3><h3 style={{ color: "black" }}>INDEX,</h3></div>
                    <div className="text"><h3>WORK,</h3><h3>WORK,</h3></div>
                    <div className="text"><h3>GALLERY,</h3><h3>GALLERY,</h3></div>
                    <div className="text"><h3>ABOUT</h3><h3>ABOUT</h3></div>
                </div>
            </div>

            <div id="axel-main" ref={mainRef}>
                <div id="axel-page1">
                    <div id="axel-page1-top">
                        <div id="axel-img-container">
                            <img src={`${IMG}/ELECTRICK-1.webp`} alt="" />
                        </div>
                    </div>
                    <div id="axel-page1-top2">
                        <div id="axel-img-container2">
                            <img src={`${IMG}/portraits-5_danibumba.webp`} alt="" />
                        </div>
                        <div id="axel-page1-top2-text">
                            <h3>ALL PICTURES ON THIS SITE</h3>
                            <h3>PROJECTED BY COPYRIGHT</h3>
                        </div>
                    </div>
                </div>

                <div id="axel-page2">
                    <div id="axel-page2-img-container">
                        <img src={`${IMG}/peugeot_153.webp`} alt="" />
                    </div>
                </div>

                <div id="axel-page3">
                    <div id="axel-page3-img-container1">
                        <img src={`${IMG}/3g0a9005.webp`} alt="" />
                    </div>
                    <div id="axel-page3-img-container2">
                        <img src={`${IMG}/denzelcurry14822.webp`} alt="" />
                    </div>
                </div>

                <div id="axel-page4">
                    <div id="axel-page4-img-container">
                        <img src={`${IMG}/LARELEVE-1.webp`} alt="" />
                    </div>
                </div>

                <div id="axel-page5">
                    <div id="axel-page5-img-container">
                        <img src={`${IMG}/AVE20231220_18444255_0090.webp`} alt="" />
                    </div>
                </div>

                <div id="axel-page6">
                    <div id="axel-page6-img-container2">
                        <img src={`${IMG}/LARELEVE-5.webp`} alt="" />
                    </div>
                    <div id="axel-page6-img-container1">
                        <img src={`${IMG}/portraits-11_benoitmagimel.webp`} alt="" />
                    </div>
                </div>

                <div id="axel-page7">
                    <div className="svg">
                        <div className="come-up-img">
                            <div className="overlay">
                                <div className="overlay-top">
                                    <div className="button1"><h3>EDITORIAL</h3></div>
                                    <div className="button2"><h3>2023</h3></div>
                                </div>
                                <div className="overlay-heading">
                                    <h1 className="text1">ROAD TRIP</h1>
                                </div>
                            </div>
                            <div className="svg2">
                                <div className="come-up-img2">
                                    <div className="overlay2">
                                        <div className="overlay-top">
                                            <div className="button1"><h3>EDITORIAL</h3></div>
                                            <div className="button2"><h3>2023</h3></div>
                                        </div>
                                        <div className="overlay-heading">
                                            <h1 className="text2">SUMMER MARKET</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="axel-page8">
                    <div id="axel-page8-part1">
                        <div className="button-wrapper">
                            <div id="axel-page8-button1">
                                <h1>INSTAGRAM</h1>
                                <img src={`${IMG}/arrow.svg`} alt="" />
                                <div className="black-circle"></div>
                                <div className="white-arrow"><img src={`${IMG}/arrow-white.svg`} alt="" /></div>
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <div id="axel-page8-button2">
                                <h1>EMAIL</h1>
                                <img src={`${IMG}/arrow.svg`} alt="" />
                                <div className="black-circle"></div>
                                <div className="white-arrow2"><img src={`${IMG}/arrow-white.svg`} alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="underline"></div>
                    <div id="axel-page8-part2">
                        <h4>©AXEL VANHESSCHE</h4>
                        <img src={`${IMG}/svg-star.svg`} alt="" />
                        <h4>LAST UPDATE : FEB 2024</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
