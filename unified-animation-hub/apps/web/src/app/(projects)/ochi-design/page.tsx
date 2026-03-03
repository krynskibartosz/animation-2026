'use client';

import dynamic from 'next/dynamic';

const OchiDesign = dynamic(() => import('@/components/projects/ochi-design/OchiDesign'), {
    ssr: false,
});

export default function OchiDesignPage() {
    return (
        <main>
            <OchiDesign />
        </main>
    );
}
