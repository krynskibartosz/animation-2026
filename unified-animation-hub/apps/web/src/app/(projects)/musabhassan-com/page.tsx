'use client';

import dynamic from 'next/dynamic';

const MusabHassanApp = dynamic(() => import('@/components/projects/musabhassan/MusabHassanApp'), {
    ssr: false,
});

export default function MusabHassanPage() {
    return <MusabHassanApp />;
}
