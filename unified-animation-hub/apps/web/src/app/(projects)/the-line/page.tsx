'use client';

import dynamic from 'next/dynamic';

const TheLine = dynamic(() => import('@/components/projects/the-line/TheLine'), {
    ssr: false,
});

export default function TheLinePage() {
    return (
        <main className="min-h-screen bg-[#dddee2]">
            <TheLine />
        </main>
    );
}
