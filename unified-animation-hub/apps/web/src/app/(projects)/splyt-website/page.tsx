'use client';

import dynamic from 'next/dynamic'

const SplytWebsiteDynamic = dynamic(
    () => import('@/components/projects/splyt-website/SplytWebsite'),
    { ssr: false }
)

export default function Page() {
    return <SplytWebsiteDynamic />
}
