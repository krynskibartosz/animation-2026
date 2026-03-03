'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ModernWebsite = dynamic(
    () => import('@/components/projects/modern-website/ModernWebsite'),
    { ssr: false }
);

export default function ModernWebsitePage() {
    return (
        <main className="min-h-screen bg-black">
            <ModernWebsite />
        </main>
    );
}
