'use client';

import { useEffect, useState, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { loadPagePromise, workScrollStateAtom, viewPortStateAtom } from '../lib/store';

export default function CursorDot() {
    const [hover, setHover] = useState(false);
    const [introDisabled, setIntroDisabled] = useState(true);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const workScrollState = useAtomValue(workScrollStateAtom);
    const viewPortState = useAtomValue(viewPortStateAtom);

    const dotContainerRef = useRef<HTMLDivElement>(null);
    const currentPosition = useRef({ x: 0, y: 0 });
    const targetPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        loadPagePromise.then(() => setIsPageLoaded(true));

        const updateMouseCoords = (e: MouseEvent) => {
            if (viewPortState.isMobile) return;

            if (introDisabled) {
                setTimeout(() => setIntroDisabled(false), 200);
            }

            const target = e.target as HTMLElement;
            const cursor = window.getComputedStyle(target).cursor;
            const isPointer = cursor === "pointer";
            setHover(isPointer);

            if (isPointer) {
                const rect = target.getBoundingClientRect();
                const width = target.clientWidth;
                const height = target.clientHeight;

                const clickableMid = {
                    x: rect.left + (width / 2),
                    y: rect.top + (height / 2)
                };

                targetPosition.current = {
                    x: clickableMid.x + ((clickableMid.x - e.clientX) * 0.15),
                    y: clickableMid.y + ((clickableMid.y - e.clientY) * 0.15)
                };
            } else {
                targetPosition.current = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
        };

        const easeInOutQuad = (t: number) => {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };

        const animate = () => {
            const t = 0.4;
            currentPosition.current.x += easeInOutQuad(t) * (targetPosition.current.x - currentPosition.current.x);
            currentPosition.current.y += easeInOutQuad(t) * (targetPosition.current.y - currentPosition.current.y);

            currentPosition.current.x = Math.ceil(currentPosition.current.x * 100) / 100;
            currentPosition.current.y = Math.ceil(currentPosition.current.y * 100) / 100;

            if (dotContainerRef.current) {
                dotContainerRef.current.style.transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0px)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', updateMouseCoords);
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', updateMouseCoords);
            cancelAnimationFrame(animId);
        };
    }, [viewPortState.isMobile, introDisabled]);

    if (!isPageLoaded) return null;

    return (
        <div
            ref={dotContainerRef}
            className={`dot-container active ${hover ? 'hover' : ''} ${(introDisabled || workScrollState.active) ? 'disabled' : ''}`}
        >
            <div className="dot"></div>
            <style jsx>{`
                .dot-container {
                    position: fixed;
                    display: block;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    mix-blend-mode: exclusion;
                    pointer-events: none;
                    will-change: width, height;
                }
                .dot {
                    position: relative;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background-color: white;
                    transform: translate(-50%, -50%);
                    transition: width 0.5s ease, height 0.5s ease;
                }
                .dot-container.active .dot {
                    width: 4vh;
                    height: 4vh;
                }
                .dot-container.disabled .dot {
                    width: 0 !important;
                    height: 0 !important;
                }
                .dot-container.hover .dot {
                    width: 7.5vh;
                    height: 7.5vh;
                }
            `}</style>
        </div>
    );
}
