'use client';

import { useEffect, useState } from 'react';
import { animate as anime } from 'animejs';
import { useAtomValue } from 'jotai';
import { loadPagePromise, scrollAnchorStateAtom } from '../lib/store';

interface NavProps {
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Nav({ scrollContainerRef }: NavProps) {
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [isMobileMenuAllowed, setIsMobileMenuAllowed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollAnchorState = useAtomValue(scrollAnchorStateAtom);

    useEffect(() => {
        setIsMobileMenuAllowed(window.innerWidth <= 950);
        const handleResize = () => setIsMobileMenuAllowed(window.innerWidth <= 950);
        window.addEventListener('resize', handleResize);

        loadPagePromise.then(() => {
            setIsLoaded(true);
        });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate = (anchor: HTMLElement | undefined) => {
        if (!anchor || !scrollContainerRef.current) return;
        scrollContainerRef.current.scrollTo({
            top: anchor.offsetTop - (window.innerHeight / 5),
            behavior: "smooth"
        });
        setMobileMenuActive(false);
    };

    if (!isLoaded) return null;

    return (
        <div className="nav-wrapper">
            <div className="flex-wrapper ico" style={{ zIndex: 21 }}>
                <button className="interactive logo-btn" onClick={() => navigate(scrollAnchorState.home)}>
                    <img src="/projects/musabhassan/assets/imgs/logo.svg" className="logo-icon" alt="Logo" draggable="false" />
                </button>
            </div>

            <div className="flex-wrapper">
                <div className={`wrapper ${mobileMenuActive ? 'mobileMenuActive' : ''}`}>
                    <ul className="nav-list">
                        <li>
                            <button className="interactive" onClick={() => navigate(scrollAnchorState.home)}>Home</button>
                        </li>
                        <li>
                            <button className="interactive" onClick={() => navigate(scrollAnchorState.work)}>Work</button>
                        </li>
                        <li>
                            <button className="interactive" onClick={() => navigate(scrollAnchorState.about)}>About</button>
                        </li>
                        <li className="mobile-only">
                            <a href="mailto:musab@musabhassan.com">Contact</a>
                        </li>
                        <li>
                            <a href="https://github.com/Musab-Hassan" target="_blank" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                </div>

                <div className="mask">
                    <button
                        className={`hb-button ${mobileMenuActive ? 'mobileMenuActive' : ''}`}
                        onClick={() => setMobileMenuActive(!mobileMenuActive)}
                        aria-label="Open Menu"
                    >
                        <div className="hb">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .nav-wrapper {
                    width: 100vw;
                    padding: 0 7vw;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 100;
                }
                .flex-wrapper.ico {
                    width: 7vh; height: 6vh; mix-blend-mode: exclusion; cursor: pointer;
                }
                .logo-btn { width: 100%; height: 100%; padding: 0; border: none; background: none; }
                .logo-icon { width: 100%; height: 100%; }

                .nav-list { list-style: none; display: flex; mix-blend-mode: exclusion; margin: 0; padding: 0; }
                .nav-list li { font-family: "Questrial", sans-serif; text-transform: uppercase; font-size: 2vh; letter-spacing: 0.2vh; display: inline-flex; align-items: center; }
                .nav-list li:not(:last-child):not(.mobile-only)::after { content: "-"; margin: 0 1vw; color: white; }
                
                .nav-list button, .nav-list a { background: none; border: none; color: white; cursor: pointer; text-decoration: none; font-size: inherit; font-family: inherit; letter-spacing: inherit; text-transform: inherit; }
                .mobile-only { display: none; }

                @media (max-width: 950px) {
                    .mobile-only { display: inline-flex; }
                    .wrapper {
                        position: fixed; top: 0; right: 0; height: 100vh; width: 0;
                        background-color: #131314; transition: 0.9s cubic-bezier(.58, .14, .06, .97) width;
                        overflow: hidden; z-index: 20;
                    }
                    .wrapper.mobileMenuActive { width: 100vw; }
                    .nav-list { flex-direction: column; justify-content: center; height: 100%; padding: 0 10vw; mix-blend-mode: normal; }
                    .nav-list li { font-size: 8vw; padding: 2vh 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); width: 100%; }
                    .nav-list li::after { display: none !important; }
                    .hb-button { display: block; z-index: 21; background: none; border: none; cursor: pointer; }
                    .hb { display: flex; flex-direction: column; gap: 5px; width: 3vh; }
                    .hb span { display: block; height: 2px; width: 100%; background: white; transition: 0.3s; }
                    .mobileMenuActive .hb span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
                    .mobileMenuActive .hb span:nth-child(2) { opacity: 0; }
                    .mobileMenuActive .hb span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
                }
                @media (min-width: 951px) {
                    .hb-button { display: none; }
                }
            `}</style>
        </div>
    );
}
