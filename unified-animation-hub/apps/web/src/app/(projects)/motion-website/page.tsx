'use client';

import dynamic from 'next/dynamic';

const MotionWebsite = dynamic(() => import('@/components/projects/motion-website/MotionWebsite'), {
    ssr: false,
});

export default function MotionWebsitePage() {
    return (
        <main className="min-h-screen bg-black">
            <MotionWebsite />
        </main>
    );
}
