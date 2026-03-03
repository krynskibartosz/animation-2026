'use client';

import dynamic from 'next/dynamic';

const FlowParty = dynamic(
    () => import('@/components/projects/flow-party/FlowParty'),
    { ssr: false }
);

export default function FlowPartyPage() {
    return (
        <main>
            <FlowParty />
        </main>
    );
}
