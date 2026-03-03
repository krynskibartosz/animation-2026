'use client';

import dynamic from 'next/dynamic'

const AwwwardsPortfolioDynamic = dynamic(
    () => import('@/components/projects/awwwards-portfolio/AwwwardsPortfolio'),
    { ssr: false }
)

export default function Page() {
    return <AwwwardsPortfolioDynamic />
}
