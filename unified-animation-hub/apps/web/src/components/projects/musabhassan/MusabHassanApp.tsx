'use client';

import { useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import slickScroll from 'slickscrolljs';
import {
    loaderAnimationPromise,
    loadPageResolve,
    imgPromisesAtom,
    dataStateAtom,
    viewPortStateAtom
} from './lib/store';
import { devMsg, fetchJsonData } from './lib/utils';

// Ported Components
import Loader from './components/Loader';
import CursorDot from './components/CursorDot';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomeSection from './sections/HomeSection';
import WorkSection from './sections/WorkSection';
import AboutSection from './sections/AboutSection';

export default function MusabHassanApp() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navBarRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [imgPromises] = useAtom(imgPromisesAtom);
    const setDataState = useSetAtom(dataStateAtom);
    const setViewPortState = useSetAtom(viewPortStateAtom);

    useEffect(() => {
        const init = async () => {
            if (!scrollContainerRef.current) return;

            // Initial setup
            scrollContainerRef.current.style.overflowY = "hidden";
            scrollContainerRef.current.scrollTo(0, 0);

            // Fetch data
            const [workData, siteData] = await Promise.all([
                fetchJsonData("/projects/musabhassan/data/work-data.json"),
                fetchJsonData("/projects/musabhassan/data/data.json")
            ]);
            setDataState({ workData, siteData });

            // Wait for images and loader animation
            await Promise.allSettled(imgPromises);
            await loaderAnimationPromise;

            setLoading(false);
            loadPageResolve();
            devMsg();

            // Initialize SlickScroll
            if (scrollContainerRef.current && navBarRef.current) {
                const instance = new (slickScroll as any)({
                    root: scrollContainerRef.current,
                    easing: "easeOutCirc",
                    duration: 1500,
                    fixedOffsets: [navBarRef.current]
                });
                setViewPortState(prev => ({ ...prev, slickscrollInstance: instance }));
            }

            // Enable scrolling
            scrollContainerRef.current.style.overflowX = "hidden";
            scrollContainerRef.current.style.overflowY = "auto";
        };

        init();
    }, []);

    return (
        <div className="musab-hassan-app">
            <CursorDot />
            {loading && <Loader />}

            <div id="scroll-frame" ref={scrollContainerRef}>
                <div id="nav-bar" ref={navBarRef}>
                    <Nav scrollContainerRef={scrollContainerRef} />
                </div>

                <HomeSection />
                <WorkSection />
                <AboutSection />
                <Footer />
            </div>

            <style jsx global>{`
                .musab-hassan-app {
                    background-color: #222224;
                    color: white;
                    font-family: "Questrial", sans-serif;
                    min-height: 100vh;
                    overflow: hidden;
                }
                #scroll-frame {
                    top: 0; left: 0; width: 100%; height: 100vh;
                    position: relative; overflow: hidden auto;
                }
                #nav-bar {
                    position: fixed; top: 10vh; z-index: 100;
                }
                canvas {
                    position: absolute; top: 0; left: 0; z-index: -1;
                }
            `}</style>
        </div>
    );
}
