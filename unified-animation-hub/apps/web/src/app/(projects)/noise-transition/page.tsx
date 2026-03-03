'use client';

import dynamic from 'next/dynamic'

const NoiseTransitionDynamic = dynamic(
    () => import('@/components/projects/noise-transition/NoiseTransition'),
    { ssr: false }
)

export default function Page() {
    return <NoiseTransitionDynamic />
}
