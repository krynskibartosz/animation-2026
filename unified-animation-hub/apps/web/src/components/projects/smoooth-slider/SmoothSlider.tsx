'use client';

import { useEffect, useRef } from 'react';

const IMAGES = [
    'img20.jpg', 'img2.webp', 'img3.jpg', 'img4.webp', 'img13.webp',
    'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.webp', 'img10.jpg',
    'img11.jpg', 'img12.jpg', 'img5.png', 'img14.jpg', 'img15.jpg',
    'img16.webp', 'img17.jpg', 'img18.jpg', 'img19.webp', 'img1.jpg',
];

export default function SmoothSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const currentX = useRef(0);
    const targetX = useRef(0);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

        const getScaleFactor = (position: number, viewportWidth: number) => {
            const quarterWidth = viewportWidth / 4;
            if (position < 0 || position > viewportWidth) return 0;
            if (position < quarterWidth) return lerp(0, 0.45, position / quarterWidth);
            if (position < 2 * quarterWidth) return lerp(0.45, 1.5, (position - quarterWidth) / quarterWidth);
            if (position < 3 * quarterWidth) return lerp(1.5, 0.45, (position - 2 * quarterWidth) / quarterWidth);
            return lerp(0.45, 0, (position - 3 * quarterWidth) / quarterWidth);
        };

        const updateScales = () => {
            cardRefs.current.forEach((card) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const scale = getScaleFactor(center, window.innerWidth);
                card.style.transform = `scale(${scale})`;
                const img = card.querySelector('img') as HTMLImageElement | null;
                if (img) img.style.transform = `scale(${scale * 1.1})`;
            });
        };

        const update = () => {
            currentX.current = lerp(currentX.current, targetX.current, 0.1);
            if (sliderRef.current) sliderRef.current.style.transform = `translateX(${currentX.current}%)`;
            updateScales();
            rafId.current = requestAnimationFrame(update);
        };

        const onScroll = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = window.scrollY / maxScroll;
            targetX.current = progress * -96;
        };

        window.addEventListener('scroll', onScroll);
        rafId.current = requestAnimationFrame(update);
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '1000vh', background: '#000' }}>
            <style>{`
        @font-face {
          font-family: Bumbon;
          src: url('/smoooth-slider/fonts/LDBumbon-Regular.woff2');
        }
      `}</style>

            <nav style={{
                width: '100%', position: 'fixed', padding: '2em',
                display: 'flex', alignItems: 'center', zIndex: 20,
            }}>
                <h1 style={{ fontFamily: 'Bumbon', color: '#fff', textTransform: 'uppercase', fontSize: 30, fontWeight: 400 }}>
                    Smoooth
                </h1>
            </nav>

            <div
                ref={sliderRef}
                style={{
                    margin: '1em', width: '500%', height: '100vh',
                    position: 'fixed', top: 0, left: '37%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                }}
            >
                {IMAGES.map((img, i) => (
                    <div
                        key={img}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        style={{ width: 400, height: 500, overflow: 'hidden', transition: 'transform 0.1s ease-out' }}
                    >
                        <img
                            src={`/smoooth-slider/images/${img}`}
                            alt={`slide-${i}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.1s ease-out' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
