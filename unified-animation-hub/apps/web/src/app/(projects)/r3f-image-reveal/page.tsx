'use client';

import dynamic from 'next/dynamic'

const R3FImageRevealDynamic = dynamic(
    () => import('@/components/projects/r3f-image-reveal/R3FImageReveal'),
    { ssr: false }
)

export default function Page() {
    return <R3FImageRevealDynamic />
}
