'use client';

import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Marquee from './components/Marquee';
import About from './components/About';
import Eyes from './components/Eyes';
import Featured from './components/Featured';
import Cards from './components/Cards';
import ReadyEyes from './components/ReadyEyes';
import Footer from './components/Footer';
import './OchiDesign.css';

export default function OchiDesign() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let scroll: any;

        // Dynamic import to avoid SSR issues with locomotive-scroll
        import('locomotive-scroll').then((LocomotiveScroll) => {
            if (scrollRef.current) {
                scroll = new LocomotiveScroll.default();
            }
        });

        return () => {
            if (scroll) scroll.destroy();
        };
    }, []);

    return (
        <div ref={scrollRef} data-scroll-container className="ochi-design-container">
            <Navbar />
            <LandingPage />
            <Marquee />
            <About />
            <Eyes />
            <Featured />
            <Cards />
            <ReadyEyes />
            <Footer />
        </div>
    );
}
