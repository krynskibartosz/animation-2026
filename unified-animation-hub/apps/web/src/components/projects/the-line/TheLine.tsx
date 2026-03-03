'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import Providers from './providers/root';
import NavBar from './components/NavBar';
import Group from './sections/Group';
import TheStudio from './sections/TheStudio';
import ClientsPlusPartners from './sections/ClientsPlusPartners';
import News from './sections/News';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

import './TheLine.css';

export default function TheLine() {
    return (
        <div className="the-line-container">
            <ReactLenis root>
                <Providers>
                    <NavBar />
                    <main>
                        <Group />
                        <TheStudio />
                        <ClientsPlusPartners />
                        <div className="relative overflow-clip bg-flare-red">
                            <News />
                            <Contact />
                            <Footer />
                        </div>
                    </main>
                </Providers>
            </ReactLenis>
        </div>
    );
}
