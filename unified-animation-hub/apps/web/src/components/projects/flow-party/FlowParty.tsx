'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Event from './components/event';
import WhoWeAre from './components/who-we-are';
import OnDemand from './components/on-demand';
import TheTutors from './components/the-tutors';
import WhatWeDo from './components/what-we-do';
import PartyTolls from './components/party-tolls';
import Footer from './components/footer';
import './FlowParty.css';

export default function FlowParty() {
    const container = useRef<HTMLDivElement | null>(null);
    const container1 = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });
    const { scrollYProgress: scrollYProgress1 } = useScroll({
        target: container1,
        offset: ['start start', 'end end'],
    });

    return (
        <div className="flow-party-container">
            <Navbar />
            <div ref={container} className="relative">
                <Hero scrollYProgress={scrollYProgress} />
                <Event scrollYProgress={scrollYProgress} />
            </div>
            <WhoWeAre />
            <div ref={container1} className="relative">
                <OnDemand scrollYProgress={scrollYProgress1} />
                <TheTutors scrollYProgress={scrollYProgress1} />
            </div>
            <WhatWeDo />
            <PartyTolls />
            <Footer />
        </div>
    );
}
