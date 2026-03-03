'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FluidScene } from './FluidScene';
import './lusion-fluid.css';

export default function LusionApp() {
    return (
        <div className="main-container">
            {/* 1. Canvas Layer: Fixed Background */}
            <div className="canvas-container">
                <Canvas
                    camera={{ position: [0, 0, 1], fov: 75 }}
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        preserveDrawingBuffer: true
                    }}
                    // In Next.js/React 19, we use a ref or a selector that exists.
                    // 'root' might not exist in the same way, so we'll target the main container or window.
                    eventPrefix="client"
                >
                    <Suspense fallback={null}>
                        <FluidScene />
                    </Suspense>
                </Canvas>
            </div>

            {/* 2. HTML Content Layer: Foreground */}
            <div className="layout">
                <header className="header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 10, display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
                    <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>LUSION</div>
                    <div className="nav-group" style={{ display: 'flex', gap: '1rem' }}>
                        <button className="nav-btn" style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>_</button>
                        <button className="nav-btn primary" style={{ background: '#fff', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '2rem', cursor: 'pointer' }}>LET'S TALK</button>
                        <button className="nav-btn" style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>MENU ••</button>
                    </div>
                </header>

                <main className="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10%', pointerEvents: 'none' }}>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, color: '#fff', margin: 0, pointerEvents: 'auto' }}>
                        Beyond Visions<br />
                        Within Reach
                    </h1>
                    <div className="hero-description" style={{ maxWidth: '600px', marginTop: '2rem', color: 'rgba(255,255,255,0.7)', pointerEvents: 'auto' }}>
                        <p>
                            Lusion is a digital production studio that brings your ideas to life
                            through visually captivating designs and interactive experiences.
                            With our talented team, we push the boundaries by solving
                            complex problems, delivering tailored solutions that exceed
                            expectations.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
