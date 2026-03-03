'use client';

import dynamic from 'next/dynamic'

const AxelPortfolioDynamic = dynamic(
    () => import('@/components/projects/axel-portfolio/AxelPortfolio'),
    { ssr: false }
)

export default function Page() {
    return <AxelPortfolioDynamic />
}
